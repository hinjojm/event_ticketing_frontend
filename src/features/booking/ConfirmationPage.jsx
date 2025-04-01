import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './ConfirmationPage.module.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, isFree, reservation } = location.state || {};

  if (!event) {
    return (
      <div className={styles.notFound}>
        <Header />
        <div className={styles.errorContainer}>
          <h2>Confirmation details not found</h2>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.confirmationContainer}>
        <div className={styles.confirmationCard}>
          <div className={styles.checkmark}>✓</div>
          <h1>{isFree ? 'Reservation Confirmed!' : 'Payment Successful!'}</h1>
          
          <div className={styles.eventSummary}>
            <h2>{event.title}</h2>
            <p>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}</p>
            <p>{event.location}</p>
            
            {isFree ? (
              <div className={styles.reservationDetails}>
                <h3>Reservation Details</h3>
                <p>Name: {reservation?.fullName}</p>
                <p>Email: {reservation?.email}</p>
                <p>Phone: {reservation?.phoneNumber}</p>
                <p className={styles.note}>You'll receive a confirmation email shortly</p>
              </div>
            ) : (
              <div className={styles.ticketInfo}>
                <h3>Ticket Information</h3>
                <p>Your e-ticket will be sent to your email</p>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button 
              onClick={() => navigate('/')}
              className={styles.primaryButton}
            >
              Back to Home
            </button>
            <button 
              onClick={() => navigate('/events')}
              className={styles.secondaryButton}
            >
              Browse More Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;