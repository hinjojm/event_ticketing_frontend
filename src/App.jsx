import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import LoginPage from './features/login/LoginPage';
import SignupPage from './features/signup/SignupPage';
import MusicalEvents from './features/events/MusicalEvents';
import ComedyEvents from './features/events/ComedyEvents';
import PartyEvents from './features/events/PartyEvents';
import SportsEvents from './features/events/SportsEvents';
import BookingPage from './features/booking/BookingPage';
import EventDetails from './features/events/EventDetails';
import AdminDashboard from './features/admin/AdminDashboard';
import UserDashboard from './features/user/UserDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/events/music" element={<MusicalEvents />} />
      <Route path="/events/comedy" element={<ComedyEvents />} />
      <Route path="/events/party" element={<PartyEvents />} />
      <Route path="/events/sports" element={<SportsEvents />} />
      <Route path="/event/:eventId/details" element={<EventDetails />} />
      <Route path="/booking/:eventId" element={<BookingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;