import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch events from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/events', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Optional: if using JWT
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.events) {
          setEvents(data.events);
        }
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <div>
      <h2>Dashboard - Available Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <button onClick={() => navigate(`/register/${event.id}`)}>Register</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
