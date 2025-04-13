import React, { useState } from 'react';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './ForgotPasswordPage.module.css';
import Header from '../../components/Header';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // API call to send reset password email
      setTimeout(() => {
        setIsLoading(false);
        setMessage('Password reset link sent to your email!');
      }, 1500);
    } catch (error) {
      setMessage(error.message || 'Failed to send reset link. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <Header />
      <div className={styles.authFormContainer}>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formHeader}>
            <h1>Reset Your Password</h1>
            <p className={styles.authSubtitle}>
              Enter your email to receive a reset link
            </p>
          </div>

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <div className={styles.inputWithIcon}>
              <FaEnvelope className={styles.inputIcon} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {message && (
            <div className={`${styles.message} ${message.includes('link sent') ? styles.success : styles.error}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              'Send Reset Link'
            )}
          </button>

          <div className={styles.authFooter}>
            <p>
              Remember your password?{' '}
              <Link to="/login" className={styles.authLink}>
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;