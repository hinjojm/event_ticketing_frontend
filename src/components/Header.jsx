import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/blue-image.png'; // Adjust path as needed
import styles from './Header.module.css'; // Create Header.module.css
import { Input } from '../features/ui';
import { Search } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={logo} alt="SmartTik Logo" width={50} height={50} />
        <div className={styles.searchContainer}>
          <Input placeholder="Search Event..." className={styles.searchInput} />
          <Search className={styles.searchIcon} />
        </div>
      </div>
      <nav className={styles.nav}>
        <button className={styles.navButton} onClick={() => navigate('/')}>Home</button>
        <button className={styles.navButton} onClick={() => navigate('/faq')}>FAQ</button>
        <button className={styles.navButton} onClick={() => navigate('/privacy-policy')}>Privacy Policy</button>
        <button className={styles.navButton} onClick={() => navigate('/login')}>Login</button>
        <button className={styles.navButton} onClick={() => navigate('/signup')}>Signup</button>
      </nav>
    </header>
  );
};

export default Header;