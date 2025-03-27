// UserDashboard.jsx

import React, { useState, useEffect } from 'react';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const userBookingsData = storedBookings.filter((booking) => booking.userId === userId);
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const userCartItems = storedCart.filter((item) => item.userId === userId);
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const profile = storedUsers.find((user) => user.id === userId);

    setUserBookings(userBookingsData);
    setCartItems(userCartItems);
    setUserProfile(profile);
  }, []);

  return (
    <div className={styles.container}>
      <h1>User Dashboard</h1>

      <h2>Your Booked Tickets</h2>
      {userBookings.map((booking) => (
        <div key={booking.id}>
          <p>Event: {booking.eventTitle}</p>
          <p>Quantity: {booking.quantity}</p>
          {/* ... other booking details ... */}
        </div>
      ))}

      <h2>Items in Cart (Awaiting Payment)</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>Event: {item.eventTitle}</p>
          <p>Quantity: {item.quantity}</p>
          {/* ... other cart item details ... */}
        </div>
      ))}

      <h2>Your Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      {/* ... other profile details ... */}
    </div>
  );
};

export default UserDashboard;