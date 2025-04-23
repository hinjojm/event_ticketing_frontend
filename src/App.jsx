import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import LoginPage from './features/login/LoginPage';
import SignupPage from './features/signup/SignupPage';
import ForgotPasswordPage from './features/auth/ForgotPasswordPage';
import MusicalEvents from './features/events/MusicalEvents';
import ComedyEvents from './features/events/ComedyEvents';
import PartyEvents from './features/events/PartyEvents';
import SportsEvents from './features/events/SportsEvents';
import BookingPage from './features/booking/BookingPage';
import EventDetails from './features/events/EventDetails';
import ConfirmationPage from './features/booking/ConfirmationPage';
import AdminDashboard from './features/admin/AdminDashboard';
import UserDashboard from './features/users/UserDashboard';
import DashboardOverview from './features/users/DashboardOverview';
import PaymentHistory from './features/users/PaymentHistory';
import UserProfile from './features/users/UserProfile';
import UserSettings from './features/users/UserSettings';
import UserTickets from './features/users/UserTickets';
import ResellTicket from './features/users/ResellTicket';
import EventsListPage from './features/admin/events/EventsListPage';
import EventForm from './features/admin/events/EventForm';
import AdminDashboardOverview from './features/admin/AdminDashboardOverview';
import CalendarPage from './features/admin/events/Calendar/CalendarPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Events Routes */}
      <Route path="/events">
        <Route path="music" element={<MusicalEvents />} />
        <Route path="comedy" element={<ComedyEvents />} />
        <Route path="party" element={<PartyEvents />} />
        <Route path="sports" element={<SportsEvents />} />
      </Route>
      
      <Route path="/event/:eventId/details" element={<EventDetails />} />
      <Route path="/booking/:eventId" element={<BookingPage />} />
      <Route path="/booking/:eventId/payment" element={<BookingPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />

      {/* User Dashboard Routes */}
      <Route path="/user" element={<UserDashboard />}>
        <Route index element={<DashboardOverview />} />
        <Route path="tickets" element={<UserTickets />} />
        <Route path="tickets/resell" element={<ResellTicket />} />
        <Route path="payments" element={<PaymentHistory />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminDashboardOverview />} />
        <Route path="events">
          <Route index element={<EventsListPage />} />
          <Route path="create" element={<EventForm />} />
          <Route path="edit/:id" element={<EventForm />} />
        </Route>
        <Route path="calendar" element={<CalendarPage />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
}

export default App;