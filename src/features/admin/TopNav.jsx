import React, { useState } from 'react';
import styles from './TopNav.module.css';
import { FaBell, FaUserCircle, FaChevronDown, FaSearch } from 'react-icons/fa';

const TopNav = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={styles.topNav}>
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search events, attendees..." />
      </div>
      
      <div className={styles.navRight}>
        <div className={styles.notification}>
          <FaBell />
          <span className={styles.badge}>3</span>
        </div>
        
        <div className={styles.profileContainer}>
          <div 
            className={styles.profile}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUserCircle className={styles.profileIcon} />
            <span className={styles.profileName}>Admin</span>
            <FaChevronDown className={styles.dropdownIcon} />
          </div>
          
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem}>View Profile</button>
              <button className={styles.dropdownItem}>Account Settings</button>
              <button className={styles.dropdownItem}>Notifications</button>
              <button className={styles.dropdownItem}>Switch Account</button>
              <button className={styles.dropdownItem}>Help Center</button>
              <button className={styles.dropdownItem} onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;