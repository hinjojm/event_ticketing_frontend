import React, { useState } from "react";
import { Card, CardContent } from "../../features/ui";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import Header from '../../components/Header';

const categoryDetails = {
  "Musical Concert": { link: "/events/music" },
  "Comedy Event": { link: "/events/comedy" },
  "Party & Hangout": { link: "/events/party" },
  "Sports Related": { link: "/events/sports" },
};

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate(categoryDetails[category].link);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.sectionContainer}>
          <Card className={styles.card}>
            <CardContent>
              <h2 className={styles.categoryTitle}>🎉 Event Categories</h2>
              <div className={styles.categoryGrid}>
                {Object.keys(categoryDetails).map((category, index) => (
                  <button
                    key={index}
                    className={styles.categoryButton}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.offers}>
            <h2 className={styles.offersTitle}>🎟️ Upcoming Events</h2>
            <div className={styles.eventPosters}>
              <div className={styles.eventPoster}>
                <img src="/assets/images/event1.jpg" alt="Event 1" />
              </div>
              <div className={styles.eventPoster}>
                <img src="/assets/images/event2.jpg" alt="Event 2" />
              </div>
              <div className={styles.eventPoster}>
                <img src="/assets/images/event3.jpg" alt="Event 3" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>More Information</h3>
            <div className={styles.infoGrid}>
              <button className={styles.infoLink}>Resell Tickets</button>
              <button className={styles.infoLink}>About Us</button>
              <button className={styles.infoLink}>Terms & Conditions</button>
              <button className={styles.infoLink}>Past Events</button>
              <div className={styles.infoContact}>
                <p>📍 Event Company Address</p>
                <p>📞 Phone: +254 700 123 456</p>
                <p>📧 Email: contact@smarttik.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>© 2025 SmartTik. Powered by Ecletics International</span>
        <div className={styles.footerIcons}>
          <img src="/assets/images/facebook.png" alt="Facebook" width={24} height={24} />
          <img src="/assets/images/twitter.png" alt="Twitter" width={24} height={24} />
          <img src="/assets/images/instagram.png" alt="Instagram" width={24} height={24} />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;