import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './SignupPage.module.css';
import Header from '../../components/Header';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= 7 && hasLetter && hasNumber;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validatePassword(formData.password)) {
      setErrorMessage('Password must be at least 7 characters with both letters and numbers.');
      setIsLoading(false);
      return;
    }

    // Convert frontend fields to backend-compatible names
    const requestBody = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email_address: formData.email,
      password: formData.password,
      phone_number: formData.phone,
      role_id: formData.role === "Event Organizer" ? 1 : 2
    };

    try {
      const response = await fetch('https://434f-41-90-101-26.ngrok-free.app/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      alert('Registration successful!');
      setErrorMessage('');
      setFormData({
        role: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
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
            <h1>Create Your Account</h1>
            <p className={styles.authSubtitle}>Join our community today</p>
          </div>

          <div className={styles.formGroup}>
            <label>I'm signing up as:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className={styles.formSelect}
            >
              <option value="">Select Role</option>
              <option value="Event Organizer">Event Organizer</option>
              <option value="User">User</option>
            </select>
          </div>

          {formData.role && (
            <>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>First Name</label>
                  <div className={styles.inputWithIcon}>
                    <FaUser className={styles.inputIcon} />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <div className={styles.inputWithIcon}>
                    <FaUser className={styles.inputIcon} />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <div className={styles.inputWithIcon}>
                  <FaPhone className={styles.inputIcon} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=""
                    required
                    pattern="\d{10,13}"
                    title="Phone number must be 10-13 digits"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Email Address</label>
                <div className={styles.inputWithIcon}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Password</label>
                <div className={styles.inputWithIcon}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=""
                    required
                    minLength="7"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className={styles.passwordHint}>
                  At least 7 characters with letters and numbers
                </p>
              </div>
            </>
          )}

          {errorMessage && (
            <div className={styles.errorMessage}>
              {errorMessage}
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
              'Create Account'
            )}
          </button>

          <div className={styles.authFooter}>
            <p>
              Already have an account?{' '}
              <Link to="/login" className={styles.authLink}>
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;