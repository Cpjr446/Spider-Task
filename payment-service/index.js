const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3001;

app.use(express.json());

const payments = [];

// Process a payment
app.post('/payments/process', (req, res) => {
  const { userId, amount, paymentMethod } = req.body;

  if (!userId || !amount || !paymentMethod) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const paymentId = uuidv4();
  const newPayment = { 
    paymentId, 
    userId, 
    amount, 
    paymentMethod, 
    status: 'Completed', 
    timestamp: new Date().toISOString() 
  };

  payments.push(newPayment);
  res.status(201).json({ paymentId, status: 'Completed' });
});

// Get payment details by payment ID
app.get('/payments/:id', (req, res) => {
  const payment = payments.find(p => p.paymentId === req.params.id);

  if (!payment) return res.status(404).json({ error: 'Payment not found' });

  res.json(payment);
});

// Get all payments made by a specific user
app.get('/users/:userId/payments', (req, res) => {
  const userPayments = payments.filter(p => p.userId === req.params.userId);

  if (userPayments.length === 0) {
    return res.status(404).json({ error: 'No payments found for this user' });
  }

  res.json(userPayments);
});

app.listen(port, () => {
  console.log(`Payment service listening at http://localhost:${port}`);
});
