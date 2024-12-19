import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import EventList from './components/EventList';
import EventAdd from './components/EventAdd';
import RegisteredUsers from './components/RegisteredUsers';
import Footer from './components/Footer';  // Import the Footer component
import FeedbackForm from './components/FeedbackForm';  // Import FeedbackForm component
import EventRegistration from './components/EventRegistration';  // Import EventRegistration component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/add-event" element={<EventAdd />} />
        <Route path="/events/:eventId/registrations" element={<RegisteredUsers />} />
        <Route path="/events/:eventId/feedback" element={<FeedbackForm />} /> {/* Add Feedback Form Route */}
        
        {/* Add route for event registration */}
        <Route 
          path="/events/:eventId/register" 
          element={<EventRegistration />} 
        />
      </Routes>
      <Footer />  {/* Add Footer at the bottom */}
    </Router>
  );
}

export default App;
