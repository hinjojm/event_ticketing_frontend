import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import Header from '../../components/Header';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email_address: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://544a-41-90-101-26.ngrok-free.app/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please try again.');
      }

      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', data.role_name);
      localStorage.setItem('email', data.emailAddress);

      alert('Login successful!');

      // Redirect based on role
      if (data.role_name === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/user');
      }

    } catch (error) {
      setErrorMessage(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <Header />
      <div className={styles.authFormContainer}>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formHeader}>
            <h1>Welcome Back</h1>
            <p className={styles.authSubtitle}>Sign in to your account</p>
          </div>

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <div className={styles.inputWithIcon}>
              <FaUser className={styles.inputIcon} />
              <input
                type="email"
                name="email_address"
                value={formData.email_address}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <div className={styles.inputWithIcon}>
              <FaLock className={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                minLength="7"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className={styles.formOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}

          <button
            type="submit"
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? <span className={styles.spinner}></span> : 'Sign In'}
          </button>

          <div className={styles.authFooter}>
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className={styles.authLink}>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
