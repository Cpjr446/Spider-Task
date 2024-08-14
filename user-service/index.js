const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(express.json());

const users = [];

// User registration
app.post('/users/register', (req, res) => {
  const { username, password, location } = req.body;
  
  if (!username || !password || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  const newUser = { 
    id: uuidv4(), 
    username, 
    password, 
    location
  };
  users.push(newUser);
  res.status(201).json({ id: newUser.id, username: newUser.username, location: newUser.location });
});

// User login
app.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ id: user.id, username: user.username, location: user.location });
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  res.json({ id: user.id, username: user.username, location: user.location });
});

// Update user location
app.put('/users/:id/location', (req, res) => {
  const { location } = req.body;
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (!location) return res.status(400).json({ error: 'Location is required' });

  user.location = location;
  res.json({ id: user.id, username: user.username, location: user.location });
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});