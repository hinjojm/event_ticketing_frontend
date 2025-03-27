// PartyEvents.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './PartyEvents.module.css';

const PartyEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const partyEvents = [
    {
      id: 1,
      title: 'New Year Bash',
      date: '2025-01-01',
      location: 'City Club',
      imageUrl: '/assets/images/party1.jpg',
      price: 3000,
    },
    {
      id: 2,
      title: "Valentine's Night",
      date: '2025-02-14',
      location: 'Love Lounge',
      imageUrl: '/assets/images/party2.jpg',
      price: 2000,
    },
    {
      id: 3,
      title: "St. Patrick's Day Party",
      date: '2025-03-17',
      location: 'Irish Pub',
      imageUrl: '/assets/images/party3.jpg',
      price: 1500,
    },
    {
      id: 4,
      title: 'Easter Weekend Party',
      date: '2025-04-20',
      location: 'Beach Resort',
      imageUrl: '/assets/images/party4.jpg',
      price: 3000,
    },
    {
      id: 5,
      title: 'Summer Pool Party',
      date: '2025-06-21',
      location: 'Rooftop Pool',
      imageUrl: '/assets/images/party5.jpg',
      price: 1800,
    },
    {
      id: 6,
      title: 'Halloween Night',
      date: '2025-10-31',
      location: 'Haunted House',
      imageUrl: '/assets/images/party6.jpg',
      price: 2200,
    },
    {
      id: 7,
      title: 'Christmas Eve Party',
      date: '2025-12-24',
      location: 'Grand Hall',
      imageUrl: '/assets/images/party7.jpg',
      price: 2800,
    },
    {
      id: 8,
      title: "New Year's Eve Countdown",
      date: '2025-12-31',
      location: 'City Square',
      imageUrl: '/assets/images/party8.jpg',
      price: 3500,
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = partyEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (event) => {
    navigate(`/event/${event.id}/details`, { state: { event } });
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1>Party & Hangout Events</h1>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <div className={styles.eventsList}>
          {filteredEvents.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
              <h2>{event.title}</h2>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p className={styles.price}>
                {event.price === 0 ? 'FREE' : `KES ${event.price}`}
              </p>
              <button onClick={() => handleViewDetails(event)}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartyEvents;