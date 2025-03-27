// ComedyEvents.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './ComedyEvents.module.css';

const ComedyEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const comedyEvents = [
    {
      id: 1,
      title: 'Stand-Up Night',
      date: '2024-04-05',
      location: 'Laugh Factory',
      imageUrl: '/assets/images/comedy1.png',
      price: 1500,
    },
    {
      id: 2,
      title: 'Improv Show',
      date: '2024-04-12',
      location: 'Comedy Club',
      imageUrl: '/assets/images/comedy2.png',
      price: 1000,
    },
    {
      id: 3,
      title: 'Comedy Open Mic',
      date: '2024-04-19',
      location: 'Local Bar',
      imageUrl: '/assets/images/comedy3.png',
      price: 0,
    },
    {
      id: 4,
      title: 'Comedy Special',
      date: '2024-04-26',
      location: 'Theater',
      imageUrl: '/assets/images/comedy4.png',
      price: 2000,
    },
    {
      id: 5,
      title: 'Humor Night',
      date: '2024-05-03',
      location: 'Comedy Spot',
      imageUrl: '/assets/images/comedy5.png',
      price: 1800,
    },
    {
      id: 6,
      title: 'Funny Friday',
      date: '2024-05-10',
      location: 'Hotel Lounge',
      imageUrl: '/assets/images/comedy6.jpg',
      price: 1200,
    },
    {
      id: 7,
      title: 'Comedy Gala',
      date: '2024-05-17',
      location: 'Convention Center',
      imageUrl: '/assets/images/comedy7.jpg',
      price: 3000,
    },
    {
      id: 8,
      title: 'Joke Night',
      date: '2024-05-24',
      location: 'Pub',
      imageUrl: '/assets/images/comedy8.jpg',
      price: 0,
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = comedyEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (event) => {
    navigate(`/event/${event.id}/details`, { state: { event } });
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1>Comedy Events</h1>
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

export default ComedyEvents;