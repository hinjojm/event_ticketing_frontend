import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './EventDetails.module.css';

const EventDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state;
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBookNow = () => {
    navigate(`/booking/${event.id}`, { state: { event, quantity, fullName, email, phoneNumber } });
  };

  if (!event) {
    return <div>Event details not found.</div>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1>{event.title}</h1>
        <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
        <p>Date: {event.date}</p>
        <p>Location: {event.location}</p>
        <p>Price: KES {event.price} per ticket</p>

        <div className={styles.quantitySelector}>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <div className={styles.userDetails}>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="tel" placeholder="Mobile Money Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>

        <button onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
};

export default EventDetails;