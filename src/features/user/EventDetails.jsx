import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaArrowLeft, FaUsers, FaInfoCircle } from 'react-icons/fa';
import styles from './EventDetails.module.css';

// Mock data (adjust as needed)
const mockEvents = {
  'jazz-fest-2023': { id: 'jazz-fest-2023', name: 'Nairobi Jazz Festival', date: '2025-12-15', time: '18:00', venue: 'KICC Nairobi', description: 'An amazing jazz festival you don\'t want to miss!', image: 'https://via.placeholder.com/150', ticketTypes: [{ type: 'VIP', price: 5000 }, { type: 'Regular', price: 3000 }] },
  'rhumba-night-2024': { id: 'rhumba-night-2024', name: 'Rhumba Night', date: '2024-11-20', time: '20:00', venue: 'Carnivore Grounds', description: 'A night of classic rhumba music.', image: 'https://via.placeholder.com/150/0000FF', ticketTypes: [{ type: 'Regular', price: 3000 }] },
  // ... add other mock events
};

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [fromDashboard, setFromDashboard] = useState(location.state?.fromDashboard || false);
  const [userTicket, setUserTicket] = useState(location.state?.userTicket || null);
  const [loading, setLoading] = useState(!location.state?.event);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.event) {
      setLoading(false);
      setFromDashboard(location.state.fromDashboard || false);
      setUserTicket(location.state.userTicket || null);
      return;
    }

    if (!location.state?.event && mockEvents[eventId]) {
      setEvent(mockEvents[eventId]);
      setLoading(false);
      setFromDashboard(false);
      setUserTicket(null);
    } else if (!location.state?.event) {
      setError('Event not found');
      setLoading(false);
      setFromDashboard(false);
      setUserTicket(null);
    }
  }, [eventId, location.state]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error || !event) return (
    <div className={styles.error}>
      <p>{error || 'Event details not found'}</p>
      <button onClick={() => navigate('/')} className={styles.backButton}>
        <FaArrowLeft /> Back to Home
      </button>
    </div>
  );

  return (
    <div className={styles.eventDetails}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <FaArrowLeft /> Back
      </button>

      <div className={styles.eventHeader}>
        <h1>{event.title || event.name}</h1>
        <img src={event.imageUrl || event.image} alt={event.title || event.name} className={styles.eventImage} />
      </div>

      <div className={styles.eventInfo}>
        <div className={styles.infoItem}>
          <FaCalendarAlt />
          <span>{event.date} {event.time && `at ${event.time}`}</span>
        </div>
        <div className={styles.infoItem}>
          <FaMapMarkerAlt />
          <span>{event.location || event.venue}</span>
        </div>
        <div className={styles.description}>
          <p>{event.description}</p>
        </div>
      </div>

      <div className={styles.ticketOptions}>
        <h2>Event Ticket Options</h2>
        {fromDashboard && userTicket ? (
          // Render UI for when navigated from the user dashboard
          <div>
            <p><strong>Ticket Status:</strong> {userTicket.status}</p>
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
            {/* You can add more conditional rendering based on the ticket status */}
          </div>
        ) : (
          // Render the regular booking options for category pages
          event.ticketTypes && event.ticketTypes.map(ticket => (
            <div key={ticket.type} className={styles.ticketType}>
              <div>
                <h3>{ticket.type}</h3>
                <p>{ticket.price === 0 ? 'FREE' : `KSh ${ticket.price?.toLocaleString()}`}</p>
              </div>
              <button
                className={styles.bookButton}
                onClick={() => navigate(`/booking/${event.id}`)}
              >
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventDetails;