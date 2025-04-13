import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Events.module.css';
import { 
  FaEdit, FaTrash, FaSearch, FaFilter,
  FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt,
  FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';

const EventsList = ({ events = [], onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Filter events based on search and filter
  const filteredEvents = events.filter(event => {
    const matchesSearch = event?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event?.venue?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || event?.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateNew = () => {
    navigate('/admin/events/create');
  };

  // Add status calculation
  const getEventStatus = (event) => {
    const ratio = event.ticketsSold / event.totalTickets;
    if (ratio > 0.8) return 'active';
    if (ratio > 0.5) return 'warning';
    return 'inactive';
  };

  return (
    <div className={styles.eventsList}>
      <div className={styles.listHeader}>
        <h2>Manage Events</h2>
        <button onClick={handleCreateNew} className={styles.createButton}>
          Create New Event
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterBox}>
          <FaFilter />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Events</option>
            <option value="Musical Concert">Musical Concerts</option>
            <option value="Comedy Event">Comedy Events</option>
            <option value="Party & Hangout">Parties & Hangouts</option>
            <option value="Sports Related">Sports Events</option>
          </select>
        </div>
      </div>

      <div className={styles.eventsGrid}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => {
            const status = getEventStatus(event);
            return (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventImage}>
                  <img 
                    src={event.photo || '/placeholder-event.jpg'} 
                    alt={event.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-event.jpg';
                    }}
                  />
                  {event.isFeatured && (
                    <span className={styles.featuredBadge}>Featured</span>
                  )}
                </div>
                
                <div className={styles.eventDetails}>
                  <h3>{event.name}</h3>
                  <p className={styles.eventType}>{event.type}</p>
                  
                  <div className={styles.eventMeta}>
                    <span>
                      <FaCalendarAlt /> {event.startDate} • {event.startTime || '18:00'}
                    </span>
                    <span>
                      <FaMapMarkerAlt /> {event.venue}, {event.city}
                    </span>
                    <span>
                      <FaTicketAlt /> {event.ticketsSold || 0}/{event.totalTickets || 0} tickets sold
                    </span>
                    <span className={styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`]}>
                      {status === 'active' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                      {status}
                    </span>
                  </div>

                  <div className={styles.priceRange}>
                    <span>KES {event.regularPrice?.toLocaleString()}</span>
                    {event.vipPrice && (
                      <span>KES {event.vipPrice.toLocaleString()}</span>
                    )}
                    {event.vvipPrice && (
                      <span>KES {event.vvipPrice.toLocaleString()}</span>
                    )}
                  </div>

                  <div className={styles.eventActions}>
                    <button 
                      onClick={() => onEdit(event.id)}
                      className={styles.editButton}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      onClick={() => onDelete(event.id)}
                      className={styles.deleteButton}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noEvents}>
            <p>No events found. Create your first event!</p>
            <button 
              onClick={handleCreateNew} 
              className={styles.createButton}
            >
              Create New Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;