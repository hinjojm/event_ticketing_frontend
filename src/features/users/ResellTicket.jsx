import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaMoneyBillWave, FaArrowLeft, FaPercentage, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import styles from './ResellTicket.module.css';

const ResellTicket = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [resellPrice, setResellPrice] = useState('');
  const [message, setMessage] = useState('');
  const [commissionRate, setCommissionRate] = useState(0.10); // 10% commission
  const [minCommission, setMinCommission] = useState(100); // Minimum commission of 100 KSh
  const [calculatedCommission, setCalculatedCommission] = useState(0);
  const [suggestedPriceRange, setSuggestedPriceRange] = useState({ min: 0, max: 0 });

  // Assuming the ticket object passed via state
  const ticket = state?.ticket || {
    id: 'EVT-001',
    eventId: 'jazz-fest-2023',
    eventName: 'Nairobi Jazz Festival',
    date: '2025-12-15',
    time: '18:00',
    venue: 'KICC Nairobi',
    originalPrice: state?.ticket?.price || 5000, // Fallback to price from state, then default
  };

  useEffect(() => {
    if (!ticket) {
      navigate('/user/tickets');
      return;
    }
    const originalPrice = ticket.originalPrice || 0;
    const lowerBound = Math.round(originalPrice * 0.7);
    const upperBound = Math.round(originalPrice * 1.2);
    setSuggestedPriceRange({ min: lowerBound, max: upperBound });
  }, [navigate, ticket]);

  useEffect(() => {
    if (resellPrice && !isNaN(resellPrice)) {
      const price = Number(resellPrice);
      const commission = Math.max(minCommission, Math.round(price * commissionRate));
      setCalculatedCommission(commission);
    } else {
      setCalculatedCommission(0);
    }
  }, [resellPrice, commissionRate, minCommission]);

  const handleResellPriceChange = (e) => {
    const value = e.target.value;
    setResellPrice(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resellPrice || isNaN(resellPrice) || Number(resellPrice) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid resell price.' });
      return;
    }

    const price = Number(resellPrice);
    if (ticket?.originalPrice && price > ticket.originalPrice * 1.5) {
      setMessage({ type: 'error', text: 'Resell price cannot exceed 150% of the original price.' });
      return;
    } else if (ticket?.originalPrice === undefined && ticket?.price && price > ticket.price * 1.5) {
      setMessage({ type: 'error', text: 'Resell price cannot exceed 150% of the original price.' });
    }

    const finalOriginalPrice = ticket.originalPrice !== undefined ? ticket.originalPrice : ticket.price;
    const resaleListingData = {
      ticketId: ticket.id,
      resellPrice: price,
      commission: calculatedCommission,
      listingDate: new Date().toISOString(),
      originalPrice: finalOriginalPrice, // Include original price in the data
    };

    console.log('Resale Listing Data:', resaleListingData);
    setMessage({ type: 'success', text: 'Your ticket has been listed for resale!' });

    setTimeout(() => {
      navigate('/user/tickets');
    }, 2000);
  };

  return (
    <div className={styles.resellContainer}>
      <header className={styles.navHeader}>
        <button onClick={() => navigate('/user/tickets')} className={styles.backButton}>
          <FaArrowLeft /> Back to Tickets
        </button>
        <h1>Resell Your Ticket</h1>
      </header>

      {!ticket ? (
        <div className={styles.errorContainer}>
          <FaExclamationTriangle className={styles.errorIcon} />
          <p>Ticket information not found. Please go back to your tickets.</p>
        </div>
      ) : (
        <>
          <div className={styles.ticketInfo}>
            <h2>{ticket.eventName}</h2>
            <div className={styles.ticketDetails}>
              <p><FaTicketAlt /> {ticket.ticketType} Ticket</p>
              <p>Original Price: KSh {ticket.originalPrice?.toLocaleString() || ticket.price?.toLocaleString() || 'N/A'}</p>
              <p>Event Date: {new Date(ticket.date).toLocaleDateString()} at {ticket.time}</p>
              <p>Venue: {ticket.venue}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.resellForm}>
            <div className={styles.formGroup}>
              <label htmlFor="resellPrice">
                <FaMoneyBillWave /> Resell Price (KSh)
              </label>
              <input
                type="number"
                id="resellPrice"
                value={resellPrice}
                onChange={handleResellPriceChange}
                placeholder="Enter your asking price"
                min="1"
                max={ticket.originalPrice !== undefined ? ticket.originalPrice * 1.5 : ticket.price * 1.5}
              />
              {suggestedPriceRange.min > 0 && (
                <div className={styles.priceGuidance}>
                  <FaInfoCircle /> Suggested: KSh {suggestedPriceRange.min.toLocaleString()} - {suggestedPriceRange.max.toLocaleString()}
                </div>
              )}
            </div>

            {resellPrice && !isNaN(resellPrice) && Number(resellPrice) > 0 && (
              <div className={styles.priceBreakdown}>
                <div className={styles.breakdownItem}>
                  <span>Your Earnings (approx.):</span>
                  <span>KSh {(Number(resellPrice) - calculatedCommission).toLocaleString()}</span>
                </div>
                <div className={styles.breakdownItem}>
                  <span><FaPercentage /> Commission ({commissionRate * 100}%{calculatedCommission > minCommission ? '' : ' - Minimum applies'}):</span>
                  <span>KSh {calculatedCommission.toLocaleString()}</span>
                </div>
              </div>
            )}

            {message && (
              <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                {message.text}
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => navigate('/user/tickets')}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={!resellPrice || isNaN(resellPrice) || Number(resellPrice) <= 0}
              >
                List Ticket for Resale
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ResellTicket;