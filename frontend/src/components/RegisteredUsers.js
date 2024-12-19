import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RegisteredUsers() {
  const { eventId } = useParams();  // Access eventId from URL
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    // Log eventId to ensure it's passed correctly
    console.log('Fetching registered users for eventId:', eventId);

    // Fetch the registered users for this event
    const fetchRegisteredUsers = async () => {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}/registrations`);
      const data = await response.json();
      console.log('Registered users data:', data);
      setRegisteredUsers(data);
    };

    if (eventId) {
      fetchRegisteredUsers();
    }
  }, [eventId]);  // Re-run when eventId changes

  return (
    <div>
      <h2>Registered Users for Event {eventId}</h2>
      {registeredUsers.length === 0 ? (
        <p>No users registered for this event yet.</p>
      ) : (
        <ul>
          {registeredUsers.map(user => (
            <li key={user.id}>
              {user.name} ({user.email}) - Event: {user.event_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RegisteredUsers;
