import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Audio from './Audio';

import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import MovieBooking from './components/MovieBooking';
import Tickets from './components/Tickets';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/moviebooking" element={<MovieBooking />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/audio" element={<Audio />} />
        
      </Routes>
    </Router>
  );
}

export default App;
