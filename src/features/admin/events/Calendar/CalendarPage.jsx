// CalendarPage.jsx
import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import Calendar from './Calendar';
import styles from './Calendar.module.css';

const CalendarPage = () => {
  // March 2025 events data
  const [events] = useState([
    {
      id: 1,
      name: 'Nairobi Jazz Festival',
      startDate: '2025-03-08',
      venue: 'Uhuru Park',
      type: 'Music',
      ticketsSold: 450,
      totalTickets: 1000,
      price: 1500
    },
    {
      id: 2,
      name: 'Tech Conference Africa',
      startDate: '2025-03-15',
      venue: 'KICC',
      type: 'Conference',
      ticketsSold: 320,
      totalTickets: 500,
      price: 3500
    },
    {
      id: 3,
      name: 'Food and Wine Expo',
      startDate: '2025-03-22',
      venue: 'Sarit Centre',
      type: 'Food',
      ticketsSold: 180,
      totalTickets: 300,
      price: 800
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 1)); // March 1, 2025

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getSelectedDateEvents = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return events.filter(event => event.startDate === dateStr);
  };

  const selectedEvents = getSelectedDateEvents();

  return (
    <div className={styles.calendarPage}>
      <div className={styles.header}>
        <h1>Event Calendar</h1>
        <p className={styles.subtitle}>March 2025 Events Schedule</p>
      </div>

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar 
            events={events} 
            onDateSelect={handleDateSelect}
            initialDate={new Date(2025, 2, 1)}
            selectedDate={selectedDate}
          />
        </div>

        <div className={styles.eventsSection}>
          <div className={styles.sectionHeader}>
            <FaCalendarAlt className={styles.headerIcon} />
            <h2>
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
          </div>

          <div className={styles.eventsContainer}>
            {selectedEvents.length > 0 ? (
              selectedEvents.map(event => (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.eventHeader}>
                    <h3>{event.name}</h3>
                    <span className={styles.eventType}>{event.type}</span>
                  </div>
                  <div className={styles.eventDetails}>
                    <p><FaMapMarkerAlt className={styles.detailIcon} /> {event.venue}</p>
                    <p><FaTicketAlt className={styles.detailIcon} /> {event.ticketsSold}/{event.totalTickets} tickets sold</p>
                    <p className={styles.eventPrice}>KES {event.price.toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noEvents}>
                <p>No events scheduled for this date</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;