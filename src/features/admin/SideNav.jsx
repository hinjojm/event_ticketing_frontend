import React from 'react';
import styles from './SideNav.module.css';
import { FaBars, FaHome, FaUser, FaLock } from 'react-icons/fa';

const SideNav = ({ isOpen, toggleNav, setActivePage }) => {
  return (
    <div className={`${styles.sideNav} ${isOpen ? styles.open : styles.closed}`}>
      <button onClick={toggleNav} className={styles.toggleButton}>
        <FaBars />
      </button>
      <ul>
        <li>
          <button onClick={() => setActivePage('dashboard')}>
            <FaHome /> {isOpen && 'Dashboard'}
          </button>
        </li>
        <li>
          <button onClick={() => setActivePage('profile')}>
            <FaUser /> {isOpen && 'Profile'}
          </button>
        </li>
        <li>
          <button onClick={() => setActivePage('changePassword')}>
            <FaLock /> {isOpen && 'Change Password'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;