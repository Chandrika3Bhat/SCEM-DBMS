const express = require('express');
const cors = require('cors');
const app = express();
const eventsRouter = require('./routes/events');  // Events router
const registrationsRouter = require('./routes/registrations');  // Registration router
const feedbackRouter = require('./routes/feedbackRouter');  // Feedback router
const auth = require('./routes/auth');  // Authentication router

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(cors());  // Enable CORS for frontend access

// Routes
app.use('/', auth);  // Authentication route
app.use('/api/events', eventsRouter);  // Event handling route
app.use('/api/registrations', registrationsRouter);  // Registration route
app.use('/api/feedback', feedbackRouter);  // Feedback route

// Handle unrecognized routes
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
