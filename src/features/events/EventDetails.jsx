import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './EventDetails.module.css';

const EventDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state || {};
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ticketType, setTicketType] = useState('regular');

  if (!event) {
    return (
      <div className={styles.notFound}>
        <Header />
        <div className={styles.errorContainer}>
          <h2>Event details not found</h2>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  // Handle free events
  if (event.price === 0) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.mainContainer}>
          <div className={styles.eventImageContainer}>
            <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
            <div className={styles.eventBadge}>FREE EVENT</div>
          </div>

          <div className={styles.eventDetails}>
            <h1 className={styles.eventTitle}>{event.title}</h1>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>📅</span>
                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>📍</span>
                <span>{event.location}</span>
              </div>
            </div>

            <div className={styles.userDetails}>
              <h3>Reserve Your Spot</h3>
              <input 
                type="text" 
                placeholder="Full Name *" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                className={styles.inputField}
                required
              />
              <input 
                type="email" 
                placeholder="Email Address *" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={styles.inputField}
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number *" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                className={styles.inputField}
                required
              />
            </div>

            <button 
              onClick={() => {
                // Validate inputs
                if (!fullName || !email || !phoneNumber) {
                  alert('Please fill in all required fields');
                  return;
                }

                // Save reservation
                const reservations = JSON.parse(localStorage.getItem('freeEventReservations') || '[]');
                reservations.push({
                  eventId: event.id,
                  eventTitle: event.title,
                  date: event.date,
                  location: event.location,
                  fullName,
                  email,
                  phoneNumber,
                  reservationDate: new Date().toISOString()
                });
                localStorage.setItem('freeEventReservations', JSON.stringify(reservations));
                
                navigate('/confirmation', { 
                  state: { 
                    event, 
                    isFree: true,
                    reservation: {
                      fullName,
                      email,
                      phoneNumber
                    }
                  } 
                });
              }}
              className={styles.bookButton}
              disabled={!fullName || !email || !phoneNumber}
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Paid event handling
  const getTicketPrice = () => {
    switch(ticketType) {
      case 'vip': return event.vipPrice || event.price * 1.5;
      case 'vvip': return event.vvipPrice || event.price * 2;
      default: return event.price;
    }
  };

  const isTicketSoldOut = (type) => {
    if (!event.ticketAvailability) return false;
    return event.ticketAvailability[type] === 0;
  };

  const handleBookNow = () => {
    if (!fullName || !email || !phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    navigate(`/booking/${event.id}`, { 
      state: { 
        event, 
        quantity, 
        fullName, 
        email, 
        phoneNumber,
        ticketType
      } 
    });
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.eventImageContainer}>
          <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
          <div className={styles.eventBadge}>
            {event.category || 'Event'}
          </div>
        </div>

        <div className={styles.eventDetails}>
          <h1 className={styles.eventTitle}>{event.title}</h1>
          
          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>📅</span>
              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>📍</span>
              <span>{event.location}</span>
            </div>
          </div>

          <div className={styles.ticketSelector}>
            <h3>Select Ticket Type</h3>
            <div className={styles.ticketOptions}>
              <button 
                className={`${styles.ticketOption} ${ticketType === 'regular' ? styles.selected : ''}`}
                onClick={() => setTicketType('regular')}
                disabled={isTicketSoldOut('regular')}
              >
                <span>Regular</span>
                <span>KES {event.price}</span>
                {isTicketSoldOut('regular') && <span className={styles.soldOut}>Sold Out</span>}
              </button>
              
              <button 
                className={`${styles.ticketOption} ${ticketType === 'vip' ? styles.selected : ''}`}
                onClick={() => setTicketType('vip')}
                disabled={isTicketSoldOut('vip')}
              >
                <span>VIP</span>
                <span>KES {event.vipPrice || event.price * 1.5}</span>
                {isTicketSoldOut('vip') && <span className={styles.soldOut}>Sold Out</span>}
              </button>
              
              <button 
                className={`${styles.ticketOption} ${ticketType === 'vvip' ? styles.selected : ''}`}
                onClick={() => setTicketType('vvip')}
                disabled={isTicketSoldOut('vvip')}
              >
                <span>VVIP</span>
                <span>KES {event.vvipPrice || event.price * 2}</span>
                {isTicketSoldOut('vvip') && <span className={styles.soldOut}>Sold Out</span>}
              </button>
            </div>
          </div>

          <div className={styles.quantitySelector}>
            <h3>Quantity</h3>
            <div className={styles.quantityControls}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
            <div className={styles.totalPrice}>
              Total: KES {(getTicketPrice() * quantity).toLocaleString()}
            </div>
          </div>

          <div className={styles.userDetails}>
            <h3>Your Information</h3>
            <input 
              type="text" 
              placeholder="Full Name *" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              className={styles.inputField}
              required
            />
            <input 
              type="email" 
              placeholder="Email Address *" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={styles.inputField}
              required
            />
            <input 
              type="tel" 
              placeholder="Phone Number *" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              className={styles.inputField}
              required
            />
          </div>

          <button 
            onClick={handleBookNow}
            className={styles.bookButton}
            disabled={!fullName || !email || !phoneNumber}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;