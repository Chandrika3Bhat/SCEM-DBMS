import React, { useState } from 'react';

const Feedback = ({ eventId }) => {
    const [userId, setUserId] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit feedback to backend
    };

    return (
        <div>
            <h2>Provide Feedback</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default Feedback;
