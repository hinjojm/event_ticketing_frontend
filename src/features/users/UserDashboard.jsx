import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  FaHome, 
  FaTicketAlt, 
  FaMoneyBillWave, 
  FaUser, 
  FaCog, 
  FaSignOutAlt, 
  FaBell, 
  FaSearch, 
  FaTimes 
} from 'react-icons/fa';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('tickets')) setActiveTab('tickets');
    else if (path.includes('payments')) setActiveTab('payments');
    else if (path.includes('profile')) setActiveTab('profile');
    else if (path.includes('settings')) setActiveTab('settings');
    else setActiveTab('dashboard');
  }, [location]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  const handleNavLinkClick = (tabName) => {
    setActiveTab(tabName);
    setShowMobileMenu(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <button
          className={styles.menuButton}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          ☰
        </button>
        <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
        <div className={styles.mobileActions}>
          <button className={styles.notificationButton}>
            <FaBell />
            {notifications.length > 0 && (
              <span className={styles.notificationBadge}>{notifications.length}</span>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {showMobileMenu && (
        <div 
          className={styles.mobileOverlay} 
          onClick={() => setShowMobileMenu(false)}
        />
      )}
      <aside className={`${styles.sidebar} ${showMobileMenu ? styles.showMobileMenu : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.userProfile}>
            <Link 
              to="/user/profile" 
              className={styles.profilePicLink}
              onClick={() => handleNavLinkClick('profile')}
            >
              <div className={styles.profilePic}>
                <FaUser />
              </div>
            </Link>
            <div className={styles.userInfo}>
              <h3>Alex Mwangi</h3>
              <p>alex.mwangi@example.com</p>
            </div>
          </div>
          <button
            className={styles.closeMenuButton}
            onClick={() => setShowMobileMenu(false)}
          >
            <FaTimes />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <ul>
            <li>
              <Link
                to="/user"
                className={activeTab === 'dashboard' ? styles.active : ''}
                onClick={() => handleNavLinkClick('dashboard')}
              >
                <FaHome /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/user/tickets"
                className={activeTab === 'tickets' ? styles.active : ''}
                onClick={() => handleNavLinkClick('tickets')}
              >
                <FaTicketAlt /> My Tickets
              </Link>
            </li>
            <li>
              <Link
                to="/user/payments"
                className={activeTab === 'payments' ? styles.active : ''}
                onClick={() => handleNavLinkClick('payments')}
              >
                <FaMoneyBillWave /> Payments
              </Link>
            </li>
            <li>
              <Link
                to="/user/profile"
                className={activeTab === 'profile' ? styles.active : ''}
                onClick={() => handleNavLinkClick('profile')}
              >
                <FaUser /> Profile
              </Link>
            </li>
            <li>
              <Link
                to="/user/settings"
                className={activeTab === 'settings' ? styles.active : ''}
                onClick={() => handleNavLinkClick('settings')}
              >
                <FaCog /> Settings
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Top Navigation */}
        <header className={styles.topNav}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchInput}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="search"
                placeholder="Search tickets, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className={styles.userActions}>
            <button className={styles.notificationButton}>
              <FaBell />
              {notifications.length > 0 && (
                <span className={styles.notificationBadge}>{notifications.length}</span>
              )}
            </button>
            <div className={styles.userMenu}>
              <Link to="/user/profile" className={styles.userAvatarLink}>
                <div className={styles.userAvatar}>
                  <FaUser />
                </div>
              </Link>
              <span>Alex Mwangi</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;