import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './MusicalEvents.module.css';

const MusicalEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const musicalEvents = [
    {
      id: 1,
      title: 'Gospel Night',
      date: '2024-03-10',
      location: 'Uhuru Garden',
      imageUrl: '/assets/images/1.png',
      price: 0,
    },
    {
      id: 2,
      title: 'Worship Night',
      date: '2024-03-15',
      location: 'KICC Roof top',
      imageUrl: '/assets/images/2.png',
      price: 2500,
    },
    {
      id: 3,
      title: 'Afrobeats',
      date: '2024-03-20',
      location: 'Sarit',
      imageUrl: '/assets/images/3.png',
      price: 12000,
    },
    {
      id: 4,
      title: 'Furaha Night',
      date: '2024-03-20',
      location: 'Uhuru Park',
      imageUrl: '/assets/images/4.png',
      price: 5000,
    },
    {
      id: 5,
      title: 'Ngemi',
      date: '2024-03-20',
      location: 'Evas Garden',
      imageUrl: '/assets/images/5.png',
      price: 2000,
    },
    {
      id: 6,
      title: 'Home coming',
      date: '2024-03-20',
      location: 'Nyayo Stadium',
      imageUrl: '/assets/images/6.jpg',
      price: 0,
    },
    {
      id: 7,
      title: 'RnB',
      date: '2024-03-20',
      location: 'City Hall',
      imageUrl: '/assets/images/7.jpg',
      price: 4000,
    },
    {
      id: 8,
      title: 'Classical',
      date: '2024-03-20',
      location: 'Nairobi Streets',
      imageUrl: '/assets/images/8.jpg',
      price: 0,
    },
    // Add more events...
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = musicalEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookNow = (event) => {
    navigate(`/event/${event.id}/details`, { state: { event } });
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1>Musical Events</h1>
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
              <button onClick={() => handleBookNow(event)}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicalEvents;