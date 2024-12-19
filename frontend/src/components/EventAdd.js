import React, { useState } from 'react';
import './EventAdd.css'; // Import CSS for styling

function EventAdd() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [type, setType] = useState('Technical'); // Default to "Technical"
  const [organizerId, setOrganizerId] = useState('');

  const [message, setMessage] = useState(''); // For success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      name,
      description,
      date,
      time,
      venue,
      type,
      organizer_id: organizerId,
    };

    try {
      const response = await fetch('http://localhost:5000/api/events/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Event added successfully!');
        // Clear the form
        setName('');
        setDescription('');
        setDate('');
        setTime('');
        setVenue('');
        setType('Technical');
        setOrganizerId('');
      } else {
        setMessage('Failed to add event: ' + data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="event-add-container">
      <h2>Add New Event</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Venue:</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="Technical">Technical</option>
            <option value="Non-Technical">Non-Technical</option>
          </select>
        </div>

        <div>
          <label>Organizer ID:</label>
          <input
            type="text"
            value={organizerId}
            onChange={(e) => setOrganizerId(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default EventAdd;
