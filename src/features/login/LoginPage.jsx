import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import Header from "../../components/Header";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Use navigate for redirection

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  console.log("email", email);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Sending data...");

    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://smartik/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); // Await the response properly

      console.log(result);

      if (response.status === 200) {
        navigate("/dashboard"); // Redirect on success
      } else {
        console.error("Login failed:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Header /> {/* Add Header component */}
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Email"
              required
              onChange={handleEmail}
            />
            <FaUser className={styles.icon} />
          </div>

          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              required
            />
            <FaLock className={styles.icon} />
          </div>

          <div className={styles.rememberForgot}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Login</button>

          <div className={styles.registerLink}>
            <p>
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
