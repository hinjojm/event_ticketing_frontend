import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';
import Header from '../../components/Header'; 
import { useState } from 'react';
// Import Header

const LoginPage = () => {

  const [passord , setPassword ] = useState("");
  const [email, setEmail] = useState("");
   

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  console.log("email", email);

  const formData = {
    email: email,
    password: password
  }

  const handleSubmit = async (formData) => {
    console.log("Sent data");

      const response = await fetch("https://smartik/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(formData)
    })

    const result = response.json();

    console.log(result);

    if(result.status === 200) {
      Router.push("/dashboard")
    } else if () {}

    }

  }
  return (
    <div className={styles.container}>
      <Header /> {/* Add Header component */}
      <div className={styles.wrapper}>
        <form action={handleSubmit}>
          <h1>Login</h1>
          <div className={styles.inputBox}>
            <input type="text" placeholder="Email" required onChange={handleEmail}/>
            <FaUser className={styles.icon} />
          </div> 

          <div className={styles.inputBox}>
            <input 
            type="password"
             placeholder="Password"
             onChange={handlePassword}
              required />
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