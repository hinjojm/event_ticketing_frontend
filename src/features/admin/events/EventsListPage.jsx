// EventsListPage.jsx
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './Events.module.css';
import { FaPlus, FaFileCsv, FaSearch, FaFilter, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const EventsListPage = () => {
  const navigate = useNavigate();
  const { events, filter, setFilter, searchTerm, setSearchTerm } = useOutletContext();

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Type', 'Date', 'Venue', 'Tickets Sold', 'Revenue'];
    const csvRows = events.map(event => [
      event.id,
      event.name,
      event.type,
      event.startDate,
      event.venue,
      event.ticketsSold,
      event.ticketsSold * event.regularPrice
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'events_export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const placeholderImageUrl = 'https://via.placeholder.com/300x200?text=Event+Image'; // Fixed placeholder

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Manage Events</h2>
        <div className={styles.actions}>
          <button onClick={exportToCSV} className={styles.csvButton}>
            <FaFileCsv /> Export CSV
          </button>
          <button
            onClick={() => navigate('/admin/events/create')}
            className={styles.createButton}
          >
            <FaPlus /> Create Event
          </button>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.search}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filter}>
          <FaFilter className={styles.filterIcon} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Events</option>
            <option value="Musical Concert">Concerts</option>
            <option value="Comedy Event">Comedy</option>
            <option value="Conference">Conferences</option>
            <option value="Party & Hangout">Parties</option>
          </select>
        </div>
      </div>

      {events.length > 0 ? (
        <div className={styles.eventsGrid}>
          {events.map(event => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventImage}>
                <img
                  src={placeholderImageUrl}
                  alt={event.name}
                />
                {event.isFeatured && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}
              </div>
              <div className={styles.eventInfo}>
                <h3>{event.name}</h3>
                <p className={styles.eventType}>{event.type}</p>
                <div className={styles.eventMeta}>
                  <span><FaCalendarAlt /> {event.startDate} • {event.startTime}</span>
                  <span><FaMapMarkerAlt /> {event.venue}, {event.city}</span>
                  <span>KES {event.regularPrice.toLocaleString()}</span>
                </div>
                <div className={styles.eventActions}>
                  <button
                    onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => console.log('Delete', event.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noEvents}>
          <p>No events found matching your criteria</p>
          <button
            onClick={() => navigate('/admin/events/create')}
            className={styles.createButton}
          >
            Create New Event
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsListPage;