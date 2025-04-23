import React, { useState } from 'react';
import { FaUser, FaLock, FaBell, FaCreditCard, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import styles from './UserSettings.module.css';

const UserSettings = () => {
  const [formData, setFormData] = useState({
    notifications: true,
    twoFactorAuth: false,
    darkMode: false,
    paymentMethods: [
      { id: 1, type: 'M-Pesa', last4: '2547' },
      { id: 2, type: 'Visa', last4: '4242' }
    ]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement actual logout logic
  };

  const removePaymentMethod = (id) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(method => method.id !== id)
    }));
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h1>Account Settings</h1>
        <p>Manage your account preferences and security</p>
      </div>

      <div className={styles.settingsSections}>
        {/* Profile Section */}
        <section className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>
            <FaUser className={styles.sectionIcon} />
            Profile Information
          </h2>
          <div className={styles.sectionContent}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Email Address</h3>
                <p>user@example.com</p>
              </div>
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Phone Number</h3>
                <p>+254 712 345 678</p>
              </div>
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>
            <FaLock className={styles.sectionIcon} />
            Security
          </h2>
          <div className={styles.sectionContent}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Password</h3>
                <p>Last changed 3 months ago</p>
              </div>
              <button className={styles.editButton}>Change</button>
            </div>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Two-Factor Authentication</h3>
                <p>{formData.twoFactorAuth ? 'Enabled' : 'Disabled'}</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={formData.twoFactorAuth}
                  onChange={handleChange}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>
            <FaBell className={styles.sectionIcon} />
            Notifications
          </h2>
          <div className={styles.sectionContent}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Email Notifications</h3>
                <p>Receive updates via email</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Dark Mode</h3>
                <p>Switch to dark theme</p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={formData.darkMode}
                  onChange={handleChange}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </section>

        {/* Payment Methods Section */}
        <section className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>
            <FaCreditCard className={styles.sectionIcon} />
            Payment Methods
          </h2>
          <div className={styles.sectionContent}>
            {formData.paymentMethods.map(method => (
              <div key={method.id} className={styles.paymentMethod}>
                <div className={styles.methodInfo}>
                  <div className={styles.methodIcon}>
                    {method.type === 'M-Pesa' ? (
                      <img src="/assets/mpesa-logo.png" alt="M-Pesa" />
                    ) : (
                      <FaCreditCard />
                    )}
                  </div>
                  <div>
                    <h3>{method.type}</h3>
                    <p>•••• •••• •••• {method.last4}</p>
                  </div>
                </div>
                <button 
                  className={styles.removeButton}
                  onClick={() => removePaymentMethod(method.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button className={styles.addPaymentButton}>
              <FaChevronRight /> Add New Payment Method
            </button>
          </div>
        </section>

        {/* Logout Section */}
        <section className={styles.settingsSection}>
          <button 
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </section>
      </div>
    </div>
  );
};

export default UserSettings;