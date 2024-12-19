import React, { useState, useEffect } from 'react';
import './EventList.css';

function EventList() {
  const [events, setEvents] = useState([]);
  const [userId] = useState(1); // Simulated user ID; replace with dynamic value
  const [message, setMessage] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setMessage('Failed to load events.');
      }
    };

    fetchEvents();
  }, []);

  // Handle registration
  const handleRegister = async (eventId) => {
    console.log('Registering for event:', eventId); // Debug log
    try {
      const response = await fetch('http://localhost:5000/api/registrations/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, eventId }), // Ensure userId and eventId are being sent correctly
      });

      const data = await response.json();
      console.log('Server response:', data); // Debug log

      if (response.ok && data.success) {
        setMessage(data.message);
        setRegisteredEvents([...registeredEvents, eventId]);
      } else {
        setMessage(data.error || 'An error occurred during registration.');
      }
    } catch (error) {
      console.error('Error during registration:', error); // Log the error
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div className="event-list-container">
      <h2>Events</h2>
      {message && <div className="message">{message}</div>}

      <div className="event-card-container">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Venue: {event.venue}</p>
            <button onClick={() => handleRegister(event.id)}>
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
