import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './EventDetails.module.css';

// Mock event data - replace with your actual data fetching
const mockEvents = {
  'jazz-fest-2023': { id: 'jazz-fest-2023', title: 'Nairobi Jazz Festival', date: '2025-12-15', time: '18:00', location: 'KICC Nairobi', imageUrl: '/assets/images/event1.jpg', price: 5000, vipPrice: 8000, vvipPrice: 12000, ticketAvailability: { regular: 100, vip: 50, vvip: 20 }, description: 'An amazing jazz festival you don\'t want to miss!' },
  'rhumba-night-2024': { id: 'rhumba-night-2024', title: 'Rhumba Night', date: '2024-11-20', time: '20:00', location: 'Carnivore Grounds', imageUrl: '/assets/images/event2.jpg', price: 3000, ticketAvailability: { regular: 150 } },
  // Add more mock events as needed
};

const EventDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const [event, setEvent] = useState(location.state?.event || mockEvents[eventId] || null);
  const [fromDashboard, setFromDashboard] = useState(location.state?.fromDashboard || false);
  const [userTicket, setUserTicket] = useState(location.state?.userTicket || null);
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ticketType, setTicketType] = useState('regular');
  const [loading, setLoading] = useState(!location.state?.event && !mockEvents[eventId]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!event && !location.state?.event && eventId && mockEvents[eventId]) {
      setEvent(mockEvents[eventId]);
      setLoading(false);
    } else if (!event && !location.state?.event && eventId) {
      setError('Event details not found');
      setLoading(false);
    } else {
      setLoading(false);
    }
    setFromDashboard(location.state?.fromDashboard || false);
    setUserTicket(location.state?.userTicket || null);
  }, [eventId, location.state, event]);

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.loadingContainer}>Loading event details...</div>
      </div>
    );
  }

  if (error || !event) {
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

            {fromDashboard && userTicket ? (
              // Display user ticket information
              <div className={styles.userTicketInfo}>
                <h3>Your Ticket Information</h3>
                <p><strong>Status:</strong> {userTicket.status}</p>
                {userTicket.paymentStatus && <p><strong>Payment Status:</strong> {userTicket.paymentStatus}</p>}
                {userTicket.bookingId && <p><strong>Booking ID:</strong> {userTicket.bookingId}</p>}
                {userTicket.status !== 'past' && userTicket.status !== 'cancelled' && userTicket.paymentStatus !== 'paid' && (
                  <Link to={`/user/bookings/${userTicket.bookingId}`} className={styles.actionButton}>
                    View/Pay Booking
                  </Link>
                )}
                {userTicket.status === 'past' && (
                  <p>This event has already occurred.</p>
                )}
                {userTicket.status === 'cancelled' && (
                  <p>This ticket has been cancelled.</p>
                )}
              </div>
            ) : (
              // Form for reserving free event
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
            )}

            {!fromDashboard && (
              <button
                onClick={() => {
                  if (!fullName || !email || !phoneNumber) {
                    alert('Please fill in all required fields');
                    return;
                  }
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
                      reservation: { fullName, email, phoneNumber }
                    }
                  });
                }}
                className={styles.bookButton}
                disabled={!fullName || !email || !phoneNumber}
              >
                Confirm Reservation
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Paid event handling
  const getTicketPrice = () => {
    switch (ticketType) {
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

          {fromDashboard && userTicket ? (
            // Display user ticket information
            <div className={styles.userTicketInfo}>
              <h3>Your Ticket Information</h3>
              <p><strong>Status:</strong> {userTicket.status}</p>
              {userTicket.paymentStatus && <p><strong>Payment Status:</strong> {userTicket.paymentStatus}</p>}
              {userTicket.bookingId && <p><strong>Booking ID:</strong> {userTicket.bookingId}</p>}
              {userTicket.status !== 'past' && userTicket.status !== 'cancelled' && userTicket.paymentStatus !== 'paid' && (
                <Link to={`/user/bookings/${userTicket.bookingId}`} className={styles.actionButton}>
                  View/Pay Booking
                </Link>
              )}
              {userTicket.status === 'past' && (
                <p>This event has already occurred.</p>
              )}
              {userTicket.status === 'cancelled' && (
                <p>This ticket has been cancelled.</p>
              )}
            </div>
          ) : (
            // Ticket selection and booking form for new purchases
            <>
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

                  {event.vipPrice !== undefined && (
                    <button
                      className={`${styles.ticketOption} ${ticketType === 'vip' ? styles.selected : ''}`}
                      onClick={() => setTicketType('vip')}
                      disabled={isTicketSoldOut('vip')}
                    >
                      <span>VIP</span>
                      <span>KES {event.vipPrice}</span>
                      {isTicketSoldOut('vip') && <span className={styles.soldOut}>Sold Out</span>}
                    </button>
                  )}

                  {event.vvipPrice !== undefined && (
                    <button
                      className={`${styles.ticketOption} ${ticketType === 'vvip' ? styles.selected : ''}`}
                      onClick={() => setTicketType('vvip')}
                      disabled={isTicketSoldOut('vvip')}
                    >
                      <span>VVIP</span>
                      <span>KES {event.vvipPrice}</span>
                      {isTicketSoldOut('vvip') && <span className={styles.soldOut}>Sold Out</span>}
                    </button>
                  )}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;