import React, { useState } from "react";
import { Card, CardContent } from "../../features/ui";
import { useNavigate, Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import Header from '../../components/Header';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

const categoryDetails = {
  "Musical Concert": { link: "/events/music" },
  "Comedy Event": { link: "/events/comedy" },
  "Party & Hangout": { link: "/events/party" },
  "Sports Related": { link: "/events/sports" },
};

// Select 2 events from each category
const featuredUpcomingEvents = [
  // Music events (first 2 from MusicalEvents.jsx)
  {
    id: 1,
    name: 'Gospel Night',
    date: '2024-03-10',
    time: '8:00 PM',
    venue: 'Uhuru Garden',
    category: 'Musical Concert',
    image: '/assets/images/1.png',
    price: 0,
  },
  {
    id: 2,
    name: 'Worship Night',
    date: '2024-03-15',
    time: '7:30 PM',
    venue: 'KICC Roof top',
    category: 'Musical Concert',
    image: '/assets/images/2.png',
    price: 2500,
  },
  // Comedy events (first 2 from ComedyEvents.jsx)
  {
    id: 1,
    name: 'Stand-Up Night',
    date: '2024-04-05',
    time: '9:00 PM',
    venue: 'Laugh Factory',
    category: 'Comedy Event',
    image: '/assets/images/comedy1.png',
    price: 1500,
  },
  {
    id: 2,
    name: 'Improv Show',
    date: '2024-04-12',
    time: '8:30 PM',
    venue: 'Comedy Club',
    category: 'Comedy Event',
    image: '/assets/images/comedy2.png',
    price: 1000,
  },
  // Party events (first 2 from PartyEvents.jsx)
  {
    id: 1,
    name: 'New Year Bash',
    date: '2025-01-01',
    time: '10:00 PM',
    venue: 'City Club',
    category: 'Party & Hangout',
    image: '/assets/images/party1.jpg',
    price: 3000,
  },
  {
    id: 2,
    name: "Valentine's Night",
    date: '2025-02-14',
    time: '8:00 PM',
    venue: 'Love Lounge',
    category: 'Party & Hangout',
    image: '/assets/images/party2.jpg',
    price: 2000,
  },
  // Sports events (first 2 from SportsEvents.jsx)
  {
    id: 1,
    name: 'Local Football Match',
    date: '2025-01-15',
    time: '3:00 PM',
    venue: 'City Stadium',
    category: 'Sports Related',
    image: '/assets/images/sports1.jpg',
    price: 300,
  },
  {
    id: 2,
    name: 'Basketball Tournament',
    date: '2025-02-20',
    time: '5:00 PM',
    venue: 'Indoor Arena',
    category: 'Sports Related',
    image: '/assets/images/sports2.jpg',
    price: 800,
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate(categoryDetails[category].link);
  };

  const handleViewDetails = (event) => {
    navigate(`/event/${event.id}/details`, { 
      state: { 
        event: {
          ...event,
          title: event.name,
          location: event.venue,
          imageUrl: event.image,
          date: event.date
        }
      } 
    });
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.sectionContainer}>
          <Card className={styles.card}>
            <CardContent>
              <h2 className={styles.categoryTitle}>🎉 Event Categories</h2>
              <div className={styles.categoryGrid}>
                {Object.keys(categoryDetails).map((category, index) => (
                  <button
                    key={index}
                    className={styles.categoryButton}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.offers}>
            <h2 className={styles.offersTitle}>🔥 Upcoming Events</h2>
            <div className={styles.featuredEventsGrid}>
              {featuredUpcomingEvents.map(event => (
                <div key={`${event.id}-${event.category}`} className={styles.featuredEventItem} onClick={() => handleViewDetails(event)}>
                  <img src={event.image} alt={event.name} className={styles.featuredEventImage} />
                  <div className={styles.featuredEventDetails}>
                    <h3 className={styles.featuredEventName}>{event.name}</h3>
                    <p className={styles.featuredEventMeta}>
                      <FaCalendarAlt className={styles.metaIcon} /> {event.date} • {event.time}
                    </p>
                    <p className={styles.featuredEventMeta}>
                      <FaMapMarkerAlt className={styles.metaIcon} /> {event.venue}
                    </p>
                    <p className={styles.featuredEventMeta}>
                      <FaTicketAlt className={styles.metaIcon} /> {event.price === 0 ? 'FREE' : `KES ${event.price}`}
                    </p>
                    <p className={styles.featuredEventCategory}>{event.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>More Information</h3>
            <div className={styles.infoGrid}>
              <button className={styles.infoLink}>Resell Tickets</button>
              <button className={styles.infoLink}>About Us</button>
              <button className={styles.infoLink}>Terms & Conditions</button>
              <button className={styles.infoLink}>Past Events</button>
              <div className={styles.infoContact}>
                <p>📍 Event Company Address</p>
                <p>📞 Phone: +254 700 123 456</p>
                <p>📧 Email: contact@smarttik.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>© 2025 SmartTik. Powered by Ecletics International</span>
        <div className={styles.footerIcons}>
          <img src="/assets/images/facebook.png" alt="Facebook" width={24} height={24} />
          <img src="/assets/images/twitter.png" alt="Twitter" width={24} height={24} />
          <img src="/assets/images/instagram.png" alt="Instagram" width={24} height={24} />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;