import React, { useState } from 'react';
import { FaUser, FaCamera, FaSave, FaTimes, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '0712345678',
    profilePic: null,
    passwordLastChanged: '2025-03-15'
  });
  
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUser(prev => ({
          ...prev,
          profilePic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser(tempUser);
    setEditMode(false);
    // Add API call to save changes
  };

  const handleCancel = () => {
    setTempUser(user);
    setEditMode(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Add password change logic here
    alert("Password changed successfully!");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUser /> Profile
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'password' ? styles.active : ''}`}
          onClick={() => setActiveTab('password')}
        >
          <FaLock /> Password
        </button>
      </div>

      {activeTab === 'profile' ? (
        <>
          <div className={styles.profileHeader}>
            <h2>Profile Information</h2>
            {!editMode ? (
              <button 
                className={styles.editButton}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className={styles.editActions}>
                <button 
                  className={styles.cancelButton}
                  onClick={handleCancel}
                >
                  <FaTimes /> Cancel
                </button>
                <button 
                  className={styles.saveButton}
                  onClick={handleSave}
                >
                  <FaSave /> Save Changes
                </button>
              </div>
            )}
          </div>

          <div className={styles.profileContent}>
            <div className={styles.profilePicture}>
              <div className={styles.avatar}>
                {tempUser.profilePic ? (
                  <img src={tempUser.profilePic} alt="Profile" />
                ) : (
                  <FaUser className={styles.defaultAvatar} />
                )}
              </div>
              {editMode && (
                <div className={styles.uploadButton}>
                  <label htmlFor="profile-upload">
                    <FaCamera /> Change Photo
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
              )}
            </div>

            <div className={styles.profileDetails}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="firstName"
                    value={tempUser.firstName}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user.firstName}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Last Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="lastName"
                    value={tempUser.lastName}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user.lastName}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <p>{user.email}</p>
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>
                {editMode ? (
                  <input
                    type="tel"
                    name="phone"
                    value={tempUser.phone}
                    onChange={handleChange}
                    pattern="\d{10,13}"
                  />
                ) : (
                  <p>{user.phone}</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.passwordSection}>
          <h2>Change Password</h2>
          <p className={styles.passwordNote}>
            Last changed: {formatDate(user.passwordLastChanged)}
          </p>
          
          <form onSubmit={handlePasswordChange} className={styles.passwordForm}>
            <div className={styles.formGroup}>
              <label>Current Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>New Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength="8"
                />
              </div>
              <p className={styles.passwordHint}>
                Must be at least 8 characters long
              </p>
            </div>

            <div className={styles.formGroup}>
              <label>Confirm New Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className={styles.saveButton}
              disabled={!currentPassword || !newPassword || !confirmPassword}
            >
              Change Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;