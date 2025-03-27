import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';
import SideNav from './SideNav';
import TopNav from './TopNav';
import { FaUsers, FaCalendarAlt, FaChartLine, FaTicketAlt } from 'react-icons/fa'; // Import icons

const AdminDashboard = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard'); // Default page

  // Mock data for demonstration 
  const stats = {
    users: 150,
    events: 30,
    bookings: 250,
    revenue: '$12,500',
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className={styles.pageContent}>
            <h2>Dashboard Content</h2>
            <p>Welcome to the Admin Dashboard.</p>

            <div className={styles.statsContainer}>
              <div className={styles.statCard}>
                <FaUsers className={styles.statIcon} />
                <div className={styles.statDetails}>
                  <span className={styles.statNumber}>{stats.users}</span>
                  <span className={styles.statLabel}>Users</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <FaCalendarAlt className={styles.statIcon} />
                <div className={styles.statDetails}>
                  <span className={styles.statNumber}>{stats.events}</span>
                  <span className={styles.statLabel}>Events</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <FaTicketAlt className={styles.statIcon} />
                <div className={styles.statDetails}>
                  <span className={styles.statNumber}>{stats.bookings}</span>
                  <span className={styles.statLabel}>Bookings</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <FaChartLine className={styles.statIcon} />
                <div className={styles.statDetails}>
                  <span className={styles.statNumber}>{stats.revenue}</span>
                  <span className={styles.statLabel}>Revenue</span>
                </div>
              </div>
            </div>
          </div>
        );
      // Add of other pages here (profile, change password, etc.)
      default:
        return (
          <div className={styles.pageContent}>
            <h2>Dashboard Content</h2>
            <p>Welcome to the Admin Dashboard.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <SideNav isOpen={isSideNavOpen} toggleNav={() => setIsSideNavOpen(!isSideNavOpen)} setActivePage={setActivePage} />
      <div className={styles.content}>
        <TopNav />
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminDashboard;