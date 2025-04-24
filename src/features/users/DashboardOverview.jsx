// src/features/dashboard/DashboardOverview.jsx
import React from "react";
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaHistory,
  FaBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./DashboardOverview.module.css";

const DashboardOverview = () => {
  // Mock user's upcoming events data (replacement with actual data fetched from backend ngrok connection)
  const upcomingEvents = [
    {
      id: "jazz-fest-2023",
      name: "Nairobi Jazz Festival",
      date: "2025-12-15",
      venue: "KICC Nairobi",
      ticketType: "VIP",
      status: "confirmed",
      payment: {
        type: "full",
        amount: 5000,
        paid: 5000,
      },
      userTicketId: "USER-TICKET-001",
      bookingId: "BOOK-001",
    },
    {
      id: "rhumba-night-2024", // Using the ID of a known mock event
      name: "Rhumba Night",
      date: "2024-11-20",
      venue: "Carnivore Grounds",
      ticketType: "Regular",
      status: "confirmed",
      payment: {
        type: "installment",
        amount: 3000,
        paid: 1500, // Partially paid
        nextPayment: "2024-11-10",
        installments: 2,
      },
      userTicketId: "USER-TICKET-003",
      bookingId: "BOOK-003",
    },
    // Add of more upcoming events here
  ];

  // Mock dashboard stats (to be replace with actual data)
  const stats = [
    {
      title: "Upcoming Events",
      value: upcomingEvents.length,
      icon: <FaCalendarAlt className={styles.calendarIcon} />,
      color: "#6e8efb",
      trend: "up",
      trendValue: "1 new",
    },
    {
      title: "Active Tickets",
      value: upcomingEvents.length, // Assuming each upcoming event is an active ticket
      icon: <FaTicketAlt className={styles.ticketIcon} />,
      color: "#a777e3",
      trend: "steady",
    },
    {
      title: "Total Spent",
      value: upcomingEvents.reduce((sum, event) => sum + event.payment.paid, 0),
      icon: <FaMoneyBillWave className={styles.moneyIcon} />,
      color: "#48bb78",
      isCurrency: true,
      trend: "up",
      trendValue: "15%",
    },
    {
      title: "Past Events",
      value: 3, // Replacement with actual count of past events
      icon: <FaHistory className={styles.historyIcon} />,
      color: "#ed8936",
      trend: "up",
      trendValue: "1 attended",
    },
  ];

  return (
    <div className={styles.overview}>
      <div className={styles.header}>
        <h2>Dashboard Overview</h2>
        <div className={styles.notificationBadge}>
          <FaBell /> <span>3</span>{" "}
          {/* Replacement with actual notification count */}
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={styles.statCard}
            style={{ borderLeft: `4px solid ${stat.color}` }}
          >
            <div className={styles.statIcon} style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <h3>{stat.title}</h3>
              <p>
                {stat.isCurrency ? "KSh " : ""}
                {stat.value.toLocaleString()}
              </p>
              {stat.trend && (
                <span className={`${styles.trend} ${styles[stat.trend]}`}>
                  {stat.trendValue || ""}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.upcomingEvents}>
        <h3>Your Upcoming Events</h3>
        {upcomingEvents.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <div className={styles.eventInfo}>
              <h4>{event.name}</h4>
              <p>
                <FaCalendarAlt /> {event.date} • {event.venue}
              </p>
              <p>
                <FaTicketAlt /> {event.ticketType} Ticket
              </p>

              {event.payment.type === "installment" && (
                <div className={styles.installmentInfo}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${
                          (event.payment.paid / event.payment.amount) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className={styles.paymentDetails}>
                    <span>Paid: KSh {event.payment.paid.toLocaleString()}</span>
                    <span>Next Payment: {event.payment.nextPayment}</span>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.eventActions}>
              <Link
                to={`/event/${event.id}/details`}
                state={{ fromDashboard: true, userTicket: event }}
                className={styles.viewButton}
              >
                View Details
              </Link>
              {event.payment.type === "installment" && (
                <Link
                  to={`/booking/${event.id}/payment`}
                  state={{
                    event: {
                      id: event.id,
                      title: event.name,
                      price: event.payment.amount / event.payment.installments,
                      date: event.date,
                    },
                    paymentOption: "installment",
                    installmentAmount:
                      event.payment.amount / event.payment.installments,
                    remainingAmount: event.payment.amount - event.payment.paid,
                  }}
                  className={styles.payButton}
                >
                  Make Payment
                </Link>
              )}
            </div>
          </div>
        ))}
        {upcomingEvents.length === 0 && <p>No upcoming events found.</p>}
      </div>

      <div className={styles.quickActions}>
        <h3>Quick Actions</h3>
        <div className={styles.actionsGrid}>
          <Link to="/events" className={styles.actionCard}>
            <FaTicketAlt /> Buy Tickets
          </Link>
          <Link to="/user/tickets" className={styles.actionCard}>
            <FaHistory /> View Tickets
          </Link>
          <Link to="/user/payments" className={styles.actionCard}>
            <FaMoneyBillWave /> Payment History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
