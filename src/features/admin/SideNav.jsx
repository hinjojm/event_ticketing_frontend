import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SideNav.module.css';
import { 
  FaBars, FaHome, FaTicketAlt, FaCalendarAlt, 
  FaUsers, FaMoneyBillWave, FaChartLine,
  FaMapMarkerAlt, FaUserCog, FaClipboardList, FaCog,
  FaChevronDown, FaChevronRight
} from 'react-icons/fa';

const SideNav = ({ isOpen, toggleNav, setActivePage, activePage }) => {
  const [eventsOpen, setEventsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (page, path) => {
    if (setActivePage) {
      setActivePage(page);
    }
    if (path) {
      navigate(path);
    }
  };

  const menuItems = [
    { 
      icon: <FaHome />, 
      label: 'Dashboard', 
      page: 'dashboard',
      path: '/admin'
    },
    { 
      icon: <FaTicketAlt />, 
      label: 'Events', 
      page: 'events',
      subItems: [
        { label: 'All Events', page: 'events-list', path: '/admin/events' },
        { label: 'Create Event', page: 'create-event', path: '/admin/events/create' }
      ]
    },
    { 
      icon: <FaCalendarAlt />, 
      label: 'Calendar', 
      page: 'calendar',
      path: '/admin/calendar'
    },
    { 
      icon: <FaUsers />, 
      label: 'Attendees', 
      page: 'attendees',
      path: '/admin/attendees'
    },
    { 
      icon: <FaMoneyBillWave />, 
      label: 'Sales', 
      page: 'sales',
      path: '/admin/sales'
    },
    { 
      icon: <FaChartLine />, 
      label: 'Analytics', 
      page: 'analytics',
      path: '/admin/analytics'
    },
    { 
      icon: <FaMapMarkerAlt />, 
      label: 'Venues', 
      page: 'venues',
      path: '/admin/venues'
    }
  ];

  const systemItems = [
    {
      icon: <FaUserCog />,
      label: 'Admin Profile',
      page: 'profile',
      path: '/admin/profile'
    },
    {
      icon: <FaClipboardList />,
      label: 'System Logs',
      page: 'logs',
      path: '/admin/logs'
    },
    {
      icon: <FaCog />,
      label: 'Settings',
      page: 'settings',
      path: '/admin/settings'
    }
  ];

  return (
    <div className={`${styles.sideNav} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.logoContainer}>
        <button onClick={toggleNav} className={styles.toggleButton}>
          <FaBars />
        </button>
        {isOpen && <h3>SmartTik</h3>}
      </div>
      
      <div className={styles.menuContainer}>
        <div className={styles.menuSection}>
          <h4 className={styles.sectionTitle}>MAIN MENU</h4>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.subItems ? (
                  <>
                    <button 
                      onClick={() => {
                        if (item.label === 'Events') setEventsOpen(!eventsOpen);
                        if (item.label === 'Reports') setReportsOpen(!reportsOpen);
                      }}
                      className={`${styles.navButton} ${
                        activePage === item.page || 
                        (item.subItems && item.subItems.some(sub => sub.page === activePage)) 
                          ? styles.active 
                          : ''
                      }`}
                    >
                      <span className={styles.icon}>{item.icon}</span>
                      {isOpen && (
                        <>
                          <span className={styles.label}>{item.label}</span>
                          <span className={styles.chevron}>
                            {item.label === 'Events' ? 
                              (eventsOpen ? <FaChevronDown /> : <FaChevronRight />) :
                              (reportsOpen ? <FaChevronDown /> : <FaChevronRight />)
                            }
                          </span>
                        </>
                      )}
                    </button>
                    
                    {isOpen && item.subItems && 
                      ((item.label === 'Events' && eventsOpen) || 
                       (item.label === 'Reports' && reportsOpen)) && (
                      <ul className={styles.subMenu}>
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <button
                              onClick={() => handleNavigation(subItem.page, subItem.path)}
                              className={`${styles.subButton} ${
                                activePage === subItem.page ? styles.active : ''
                              }`}
                            >
                              {subItem.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.page, item.path)}
                    className={`${styles.navButton} ${
                      activePage === item.page ? styles.active : ''
                    }`}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    {isOpen && <span className={styles.label}>{item.label}</span>}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.menuSection}>
          <h4 className={styles.sectionTitle}>SYSTEM</h4>
          <ul>
            {systemItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.page, item.path)}
                  className={`${styles.navButton} ${
                    activePage === item.page ? styles.active : ''
                  }`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {isOpen && <span className={styles.label}>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNav;