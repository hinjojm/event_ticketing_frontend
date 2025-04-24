import React, { useState, useEffect } from 'react'; 
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import Calendar from './events/Calendar/Calendar';
import SideNav from './SideNav';
import TopNav from './TopNav';

const AdminDashboard = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        name: 'Nairobi Jazz Festival',
        type: 'Musical Concert',
        ticketsSold: 3200,
        totalTickets: 5000,
        regularPrice: 2500,
        startDate: '2023-11-15',
        venue: 'KICC Nairobi',
        city: 'Nairobi',
        photo: '/images/jazz-festival.jpg',
        isFeatured: true
      },
      {
        id: 2,
        name: 'Comedy Night Extravaganza',
        type: 'Comedy Event',
        ticketsSold: 1800,
        totalTickets: 2500,
        regularPrice: 1500,
        startDate: '2023-12-05',
        venue: 'Carnivore Restaurant',
        city: 'Nairobi',
        photo: '/images/comedy-night.jpg'
      },
      {
        id: 3,
        name: 'Tech Conference 2023',
        type: 'Conference',
        ticketsSold: 1200,
        totalTickets: 2000,
        regularPrice: 3500,
        startDate: '2023-11-25',
        venue: 'Safari Park Hotel',
        city: 'Nairobi',
        photo: '/images/tech-conf.jpg',
        isFeatured: true
      },
      {
        id: 4,
        name: 'Beach Party Weekend',
        type: 'Party & Hangout',
        ticketsSold: 950,
        totalTickets: 1500,
        regularPrice: 2000,
        startDate: '2023-12-10',
        venue: 'Diani Beach Resort',
        city: 'Mombasa',
        photo: '/images/beach-party.jpg'
      }
    ];
    setEvents(sampleEvents);
    console.log("AdminDashboard - Events Data:", sampleEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || event.type === filter;
    return matchesSearch && matchesFilter;
  });

  console.log("AdminDashboard - Filtered Events:", filteredEvents);

  return (
    <div className={styles.container}>
      <SideNav 
        isOpen={isSideNavOpen} 
        toggleNav={() => setIsSideNavOpen(!isSideNavOpen)}
      />
      <div className={styles.content}>
        <TopNav onLogout={() => console.log('Logout')} />
        <div className={styles.pageContent}>
          <Outlet context={{ 
            events: filteredEvents,
            allEvents: events,
            filter,
            setFilter,
            searchTerm,
            setSearchTerm 
          }} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
