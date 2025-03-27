import React from 'react';
import styles from './TopNav.module.css';
import { FaSignOutAlt } from 'react-icons/fa';

const TopNav = ({ onLogout }) => {
  return (
    <div className={styles.topNav}>
      <h1>Admin Dashboard</h1>
      <button onClick={onLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default TopNav;