import React, { useState } from 'react';
import { FaTicketAlt, FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaExchangeAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserTickets.module.css';

const UserTickets = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  // Sample ticket data - replace with API calls
  const [tickets, setTickets] = useState({
    upcoming: [
      {
        id: 'EVT-001-USER', // Unique ID for the user's ticket
        eventId: 'jazz-fest-2023', // ID of the event
        eventName: 'Nairobi Jazz Festival',
        date: '2025-12-15',
        time: '18:00',
        venue: 'KICC Nairobi',
        ticketType: 'VIP',
        price: 5000,
        status: 'confirmed', // Could be 'confirmed', 'pending', 'cancelled', 'past'
        paymentStatus: 'paid', // 'paid', 'partial', 'unpaid'
        qrCode: null,
        canCancel: true,
        canResell: true,
        description: 'An amazing jazz festival you don\'t want to miss!',
        image: 'https://via.placeholder.com/150',
        ticketTypes: [{ type: 'VIP', price: 5000 }],
        bookingId: 'BOOK-001', // Unique ID for the user's booking
      }
    ],
    past: [
      {
        id: 'EVT-002-USER',
        eventId: 'rhumba-night-2024',
        eventName: 'Rhumba Night',
        date: '2024-11-20',
        time: '20:00',
        venue: 'Carnivore Grounds',
        ticketType: 'Regular',
        price: 3000,
        status: 'past',
        paymentStatus: 'paid',
        qrCode: null,
        canCancel: false,
        canResell: false,
        description: 'A night of classic rhumba music.',
        image: 'https://via.placeholder.com/150/0000FF',
        ticketTypes: [{ type: 'Regular', price: 3000 }],
        bookingId: 'BOOK-002',
      }
    ],
    cancelled: [],
  });

  const handleCancelTicket = (ticketId) => {
    // ... your cancel ticket logic
  };

  const handleResellTicket = (ticketId) => {
    const ticket = tickets[activeTab].find(t => t.id === ticketId);
    if (ticket) {
      navigate('/user/tickets/resell', { state: { ticket } });
    }
  };

  const handleViewDetails = (eventId, isUserTicket = false, ticket = null) => {
    // If it's a user's ticket, pass the ticket details as well
    const eventDetails = tickets.upcoming.find(t => t.eventId === eventId) || tickets.past.find(t => t.eventId === eventId);
    if (eventDetails) {
      navigate(`/event/${eventId}/details`, { state: { event: eventDetails, fromDashboard: isUserTicket, userTicket: ticket } });
    } else {
      console.error(`Event with ID ${eventId} not found.`);
    }
  };

  return (
    <div className={styles.contentArea}>
      <h1 className={styles.pageTitle}>My Tickets</h1>

      <div className={styles.tabs}>
        <button
          className={activeTab === 'upcoming' ? styles.active : ''}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={activeTab === 'past' ? styles.active : ''}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
        <button
          className={activeTab === 'cancelled' ? styles.active : ''}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>

      <div className={styles.ticketList}>
        {tickets[activeTab].length === 0 ? (
          <div className={styles.emptyState}>
            <p>No tickets in this section.</p>
          </div>
        ) : (
          tickets[activeTab].map(ticket => (
            <div key={ticket.id} className={styles.ticketCard}>
              <div className={styles.ticketInfo}>
                <h3>{ticket.eventName}</h3>
                <p><FaCalendarAlt /> {new Date(ticket.date).toLocaleDateString()} at {ticket.time}</p>
                <p><FaMapMarkerAlt /> {ticket.venue}</p>
                <p><FaTicketAlt /> {ticket.ticketType} Ticket</p>
                <p>Status: {ticket.status}</p>
                {ticket.paymentStatus && <p>Payment: {ticket.paymentStatus}</p>}
              </div>
              <div className={styles.ticketActions}>
                {ticket.canCancel && (
                  <button onClick={() => handleCancelTicket(ticket.id)} className={styles.cancelButton}>
                    <FaTimes /> Cancel
                  </button>
                )}
                {ticket.canResell && (
                  <button onClick={() => handleResellTicket(ticket.id)} className={styles.resellButton}>
                    <FaExchangeAlt /> Resell
                  </button>
                )}
                <button
                  onClick={() => handleViewDetails(ticket.eventId, true, ticket)}
                  className={styles.viewDetailsButton}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserTickets;