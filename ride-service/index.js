const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

// location of cabs 
const cabs = [
  { id: 1, location: { x: 2, y: 3 } },
  { id: 2, location: { x: 4, y: 5 } },
  { id: 3, location: { x: 7, y: 1 } },
];

// Function to calculate distance between two points
function calculateDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

app.post('/ride/request', (req, res) => {
  const { userLocation } = req.body;

  if (!userLocation) {
    return res.status(400).json({ error: 'Missing user location' });
  }

  const nearbyCabs = cabs.filter(cab => {
    const distance = calculateDistance(
      userLocation.x, userLocation.y,
      cab.location.x, cab.location.y
    );
    return distance <= 5; // small unit radius
  });

  if (nearbyCabs.length > 0) {
    res.status(200).json({
      message: 'Cabs available',
      availableCabs: nearbyCabs.length,
      cabs: nearbyCabs
    });
  } else {
    res.status(404).json({ message: 'No cabs available within 5 unit radius' });
  }
});

app.listen(port, () => {
  console.log(`Ride service listening at http://localhost:${port}`);
});
