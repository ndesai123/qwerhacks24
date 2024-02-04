import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Welcome from './components/welcome'; // Import your components
import FeedPage from './feed';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/feed/" element={<FeedPage/>} />
        {/* <Route path="/account/" exact component={} />
        <Route path="/create-event/" exact component={} /> */}
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
