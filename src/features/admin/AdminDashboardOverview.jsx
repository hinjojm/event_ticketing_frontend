import React from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from './AdminDashboard.module.css';
import { 
  FaTicketAlt, FaCalendarAlt, FaUsers, FaMoneyBillWave,
  FaArrowUp, FaArrowDown, FaPlus, FaFileAlt 
} from 'react-icons/fa';

Chart.register(...registerables);

const AdminDashboardOverview = () => {
  // Sample events data (4 events)
  const events = [
    {
      id: 1,
      name: 'Nairobi Jazz Festival',
      type: 'Musical Concert',
      ticketsSold: 3200,
      totalTickets: 5000,
      regularPrice: 2500,
      startDate: '2023-11-15',
      photo: '/images/jazz-festival.jpg'
    },
    {
      id: 2,
      name: 'Comedy Night Extravaganza',
      type: 'Comedy Event',
      ticketsSold: 1800,
      totalTickets: 2500,
      regularPrice: 1500,
      startDate: '2023-12-05',
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
      photo: '/images/tech-conf.jpg'
    },
    {
      id: 4,
      name: 'Beach Party Weekend',
      type: 'Party & Hangout',
      ticketsSold: 950,
      totalTickets: 1500,
      regularPrice: 2000,
      startDate: '2023-12-10',
      photo: '/images/beach-party.jpg'
    }
  ];

  // Chart data (installation of js. chart)
  const chartData = {
    labels: events.map(event => event.name),
    datasets: [
      {
        label: 'Tickets Sold',
        data: events.map(event => event.ticketsSold),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Total Tickets',
        data: events.map(event => event.totalTickets),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Number of Tickets' }
      }
    }
  };

  // Stats calculation
  const stats = [
    {
      icon: <FaTicketAlt />,
      value: events.reduce((sum, event) => sum + event.ticketsSold, 0).toLocaleString(),
      label: 'Total Tickets Sold',
      trend: 'up',
      change: '12%'
    },
    {
      icon: <FaMoneyBillWave />,
      value: `KSh ${events.reduce((sum, event) => sum + (event.ticketsSold * event.regularPrice), 0).toLocaleString()}`,
      label: 'Total Revenue',
      trend: 'up',
      change: '8%'
    },
    {
      icon: <FaUsers />,
      value: events.length,
      label: 'Total Events',
      trend: 'up', 
      change: '5%'
    },
    {
      icon: <FaCalendarAlt />,
      value: events.filter(e => new Date(e.startDate) > new Date()).length,
      label: 'Upcoming Events',
      trend: 'down',
      change: '2%'
    }
  ];

  return (
    <div className={styles.dashboardOverview}>
      <h2>Dashboard Overview</h2>
      <p className={styles.subtitle}>Your event management at a glance</p>

      {/* Stats Cards */}
      <div className={styles.statsContainer}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statDetails}>
              <span className={styles.statNumber}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
              <div className={styles.statMeta}>
                <span className={`${styles.trend} ${stat.trend === 'up' ? styles.up : styles.down}`}>
                  {stat.change} {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Sales Chart */}
      <div className={styles.chartSection}>
        <h3><FaTicketAlt className={styles.chartIcon} /> Ticket Sales Overview</h3>
        <div className={styles.chartWrapper}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Quick Actions - Moved below chart */}
      <div className={styles.quickActions}>
        <h3>Quick Actions</h3>
        <div className={styles.actionButtons}>
          <Link to="/admin/events/create" className={styles.actionButton}>
            <FaPlus /> Create Event
          </Link>
          <button className={styles.actionButton}>
            <FaFileAlt /> Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverview; 