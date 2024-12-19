import React, { useState } from 'react';

function FeedbackForm({ eventId, userId }) {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!feedback || !rating) {
      setMessage('Please provide both feedback and rating.');
      return;
    }

    // Send feedback to backend
    const response = await fetch('http://localhost:5000/api/feedback/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        userId,
        feedback,
        rating,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setMessage('Feedback submitted successfully!');
      setFeedback('');
      setRating(1);
    } else {
      setMessage('Error submitting feedback.');
    }
  };

  return (
    <div>
      <h3>Submit Feedback for Event {eventId}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            required
          />
        </div>
        <div>
          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FeedbackForm;
