import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './SignupPage.module.css';
import Header from '../../components/Header'; // Import Header

const SignupPage = () => {
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!validatePassword()) {
      setErrorMessage('Password must be at least 10 characters, contain uppercase, lowercase, number, and a special character.');
      return;
    }
    setErrorMessage('');
    alert('Registration Successful!');
  };

  return (
    <div>
      <Header /> {/* Add Header component */}
      <div className={styles.wrapper}>
        <form onSubmit={handleRegister}>
          <h1>Create an Account</h1>

          <div className={styles.inputBox}>
            <select onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="Event Organizer">Event Organizer</option>
              <option value="User">User</option>
            </select>
          </div>

          {role && (
            <>
              <div className={styles.inputBox}>
                <input type="text" placeholder="First Name" required />
                <FaUser className={styles.icon} />
              </div>
              <div className={styles.inputBox}>
                <input type="text" placeholder="Last Name" required />
                <FaUser className={styles.icon} />
              </div>
              <div className={styles.inputBox}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  pattern="\d{10,13}"
                  title="Phone number must be between 10 and 13 digits."
                />
                <FaPhone className={styles.icon} />
              </div>
              <div className={styles.inputBox}>
                <input type="email" placeholder="Email" required />
                <FaEnvelope className={styles.icon} />
              </div>
              <div className={styles.inputBox}>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className={styles.icon} />
              </div>
              <div className={styles.inputBox}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FaLock className={styles.icon} />
              </div>
            </>
          )}

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          <button type="submit" className={styles.registerButton}>Register</button>

          <div className={styles.registerLink}>
            <p>
              Already registered? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;