const express = require('express');
const db = require('../db'); // Assuming this is your MySQL connection setup
const router = express.Router();

// Register for a specific event
router.post('/register', async (req, res) => {
  const { userId, eventId } = req.body;

  console.log(`Received registration request: userId = ${userId}, eventId = ${eventId}`);

  // Validate input
  if (!userId || !eventId) {
    console.error('Missing userId or eventId');
    return res.status(400).json({ error: 'userId and eventId are required' });
  }

  try {
    // Check if the user is already registered for the event
    const [existingRegistration] = await db.execute(
      'SELECT * FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, eventId]
    );

    console.log('Existing registration:', existingRegistration); // Debug log

    if (existingRegistration.length > 0) {
      console.log(`User ${userId} is already registered for event ${eventId}`);
      return res.status(400).json({ error: 'User is already registered for this event' });
    }

    // Insert the registration into the database
    const query = 'INSERT INTO registrations (user_id, event_id) VALUES (?, ?)';
    await db.execute(query, [userId, eventId]);

    // Respond with a success message
    console.log(`User ${userId} successfully registered for event ${eventId}`);
    res.status(201).json({ success: true, message: `Successfully registered for event with ID ${eventId}` });
  } catch (error) {
    console.error('Error during registration:', error); // Log detailed error
    res.status(500).json({ error: 'An error occurred during registration' });
  }
});

module.exports = router;
