const express = require('express');
const router = express.Router();
const db = require('../db');  // Your database connection

// Submit feedback for an event
router.post('/submit', (req, res) => {
  const { eventId, userId, feedback, rating } = req.body;

  // Validate input
  if (!eventId || !userId || !feedback || !rating) {
    return res.status(400).json({ error: 'Event ID, User ID, feedback, and rating are required.' });
  }

  // Check if the rating is within a valid range (e.g., 1 to 5)
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }

  // Insert feedback into the database
  const query = `INSERT INTO feedback (event_id, user_id, feedback, rating) 
                 VALUES (?, ?, ?, ?)`;

  db.query(query, [eventId, userId, feedback, rating], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error submitting feedback: ' + err.message });
    }
    return res.json({ success: true, message: 'Feedback submitted successfully!' });
  });
});

module.exports = router;
