import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventRegistration = ({ userId }) => {
  const { eventId } = useParams();  // Get the eventId from the URL
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/registrations/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, eventId }),  // Send both userId and eventId
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Successfully registered for the event!');
      } else {
        setMessage(data.error || 'Failed to register.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h1>Register for Event {eventId}</h1>
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EventRegistration;
