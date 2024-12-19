const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');  // Your database connection

const authRoutes = require('./routes/auth'); // Import the auth routes
const eventRoutes = require('./routes/events');
const feedbackRoutes = require('./routes/feedbackRouter');
const registrationRoutes = require('./routes/registrations'); // Your existing routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Use the authentication routes
app.use('/api/auth', authRoutes); // Register the login route

// Use the other routes
app.use('/api/events', eventRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/registrations', registrationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
