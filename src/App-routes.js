import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Welcome from './components/welcome'; // Import your components
import FeedPage from './feed';
import Profile from './profile';
import EventPage from './components/createEvent';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/feed" element={<FeedPage/>} />
        <Route path="/account" element={<Profile/>} />
        <Route path="/create-event" element={<EventPage/>} />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
