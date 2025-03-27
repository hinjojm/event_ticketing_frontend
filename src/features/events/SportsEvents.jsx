import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './SportsEvents.module.css';

const SportsEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Sports event data
  const sportsEvents = [
    {
      id: 1,
      title: 'Local Football Match',
      date: '2025-01-15',
      location: 'City Stadium',
      imageUrl: '/assets/images/sports1.jpg',
      price: 300,
    },
    {
      id: 2,
      title: 'Basketball Tournament',
      date: '2025-02-20',
      location: 'Indoor Arena',
      imageUrl: '/assets/images/sports2.jpg',
      price: 800,
    },
    {
      id: 3,
      title: 'Marathon Race',
      date: '2025-03-25',
      location: 'City Park',
      imageUrl: '/assets/images/sports3.jpg',
      price: 0, // Free event
    },
    {
      id: 4,
      title: 'Tennis Open',
      date: '2025-04-30',
      location: 'Tennis Club',
      imageUrl: '/assets/images/sports4.jpg',
      price: 1200,
    },
    {
      id: 5,
      title: 'Swimming Competition',
      date: '2025-06-05',
      location: 'Aquatic Center',
      imageUrl: '/assets/images/sports5.jpg',
      price: 1000,
    },
    {
      id: 6,
      title: 'Cycling Race',
      date: '2025-07-10',
      location: 'Mountain Trails',
      imageUrl: '/assets/images/sports6.jpg',
      price: 0, // Free event
    },
    {
      id: 7,
      title: 'Golf Tournament',
      date: '2025-08-15',
      location: 'Golf Course',
      imageUrl: '/assets/images/sports7.jpg',
      price: 1500,
    },
    {
      id: 8,
      title: 'Athletics Meet',
      date: '2025-09-20',
      location: 'Sports Complex',
      imageUrl: '/assets/images/sports8.jpg',
      price: 700,
    },
    // Add more sports events...
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = sportsEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (event) => {
    navigate(`/event/${event.id}/details`, { state: { event } });
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1>Sports Related Events</h1>
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

export default SportsEvents;