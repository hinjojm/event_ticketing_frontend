// Calendar.jsx
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './Calendar.module.css';

const Calendar = ({ events = [], onDateSelect, initialDate, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const today = new Date();

  // Helper functions
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const getMonthName = (date) => date.toLocaleString('default', { month: 'long' });
  const getYear = (date) => date.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateSelect(newDate);
  };

  const getEventsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return events.filter(event => event.startDate === dateStr);
  };

  const isToday = (day) => (
    day === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()
  );

  const isSelected = (day) => (
    day === selectedDate.getDate() &&
    currentDate.getMonth() === selectedDate.getMonth() &&
    currentDate.getFullYear() === selectedDate.getFullYear()
  );

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const days = [];
  
  // Empty days for start of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
  }

  // Actual days of month
  for (let i = 1; i <= daysInMonth; i++) {
    const dateEvents = getEventsForDate(i);
    days.push(
      <button
        key={`day-${i}`}
        className={`
          ${styles.day}
          ${isToday(i) ? styles.today : ''}
          ${isSelected(i) ? styles.selected : ''}
          ${dateEvents.length > 0 ? styles.hasEvents : ''}
        `}
        onClick={() => handleDateClick(i)}
      >
        <span className={styles.dayNumber}>{i}</span>
        {dateEvents.length > 0 && (
          <div className={styles.eventIndicator}>
            {[...Array(Math.min(dateEvents.length, 3))].map((_, index) => (
              <span key={index} className={styles.eventDot} />
            ))}
          </div>
        )}
      </button>
    );
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button onClick={prevMonth} className={styles.navButton}>
          <FaChevronLeft />
        </button>
        <h2>
          {getMonthName(currentDate)} {getYear(currentDate)}
        </h2>
        <button onClick={nextMonth} className={styles.navButton}>
          <FaChevronRight />
        </button>
      </div>
      
      <div className={styles.weekDays}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className={styles.weekDay}>{day}</div>
        ))}
      </div>
      
      <div className={styles.daysGrid}>
        {days}
      </div>
    </div>
  );
};

export default Calendar;