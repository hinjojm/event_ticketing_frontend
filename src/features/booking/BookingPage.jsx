// BookingPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './BookingPage.module.css';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, quantity, fullName, email, phoneNumber } = location.state;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentOption, setPaymentOption] = useState('full');
  const [installments, setInstallments] = useState('');
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNews, setSubscribeNews] = useState(false);
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [mobileNumber, setMobileNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  useEffect(() => {
    calculateInstallmentAmount();
    loadPaymentRecords();
  }, [event, installments, paymentOption, quantity]);

  useEffect(() => {
    if (event && paymentOption === 'installments') {
      setRemainingAmount(event.price * quantity);
    } else {
      setRemainingAmount(0);
    }
  }, [event, paymentOption, quantity]);

  const calculateInstallmentAmount = () => {
    if (event && paymentOption === 'installments' && installments > 1) {
      setInstallmentAmount((event.price * quantity) / installments);
    } else {
      setInstallmentAmount(event?.price * quantity || 0);
    }
  };

  const loadPaymentRecords = () => {
    const records = JSON.parse(localStorage.getItem(`paymentRecords_${event?.id}`)) || [];
    setPaymentRecords(records);
    calculateRemainingAmount(records);
  };

  const calculateRemainingAmount = (records) => {
    if (event && paymentOption === 'installments') {
      const totalPaid = records.reduce((sum, record) => sum + record.amount, 0);
      setRemainingAmount(event.price * quantity - totalPaid);
    } else {
      setRemainingAmount(0);
    }
  };

  const handlePayment = () => {
    if (paymentMethod && event && agreeTerms) {
      const paymentData = {
        eventId: event.id,
        paymentMethod: paymentMethod,
        paymentOption: paymentOption,
        installments: paymentOption === 'installments' ? installments : null,
        amount: paymentOption === 'installments' ? installmentAmount : event.price * quantity,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        subscribeNews: subscribeNews,
        paymentDate: new Date().toISOString(),
        quantity: quantity,
      };

      const newRecords = [...paymentRecords, {
        amount: paymentData.amount,
        paymentDate: paymentData.paymentDate,
      }];

      localStorage.setItem(`paymentRecords_${event.id}`, JSON.stringify(newRecords));
      setPaymentRecords(newRecords);
      calculateRemainingAmount(newRecords);

      // Simulate payment processing here
      alert(`Payment of KES ${paymentData.amount} via <span class="math-inline">\{paymentMethod\} \(</span>{paymentOption} payment) successful!`);
      navigate('/');
    } else if (!agreeTerms) {
      alert("Please agree to the terms and conditions.");
    } else {
      alert('Please select a payment method and agree to terms.');
    }
  };

  const handleInstallmentsChange = (e) => {
    setInstallments(parseInt(e.target.value));
    calculateInstallmentAmount();
    loadPaymentRecords();
  };

  if (!event) {
    return <div>Event details not found.</div>;
  }

  if (event.price === 0) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <h1>Book Event: {event.title}</h1>
          <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>This event is FREE!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1>{event.title}</h1>
        <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
        <p>Date: {event.date}</p>
        <p>Location: {event.location}</p>
        <p>Price: KES {event.price * quantity}</p>

        <label>
          Payment Method:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Select Method</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="Airtel Money">Airtel Money</option>
            <option value="Visa Card">Visa Card</option>
          </select>
        </label>

        {paymentMethod === 'M-Pesa' || paymentMethod === 'Airtel Money' ? (
          <input
            type="tel"
            placeholder="Provide your M-Pesa/Airtel Money Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className={styles.mobileNumberInput}
          />
        ) : paymentMethod === 'Visa Card' ? (
          <div>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={styles.cardInput}
            />
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className={styles.cardInput}
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className={styles.cardInput}
            />
            <select className={styles.countrySelect}>
              <option>--- Select Country ---</option>
              <option value="KE">Kenya</option>
              {/* Add all countries here */}
            </select>
            <input
              type="text"
              placeholder="Billing Address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className={styles.cardInput}
            />
          </div>
        ) : null}

        <label>
          Payment Option:
          <select value={paymentOption} onChange={(e) => {
            setPaymentOption(e.target.value);
            calculateInstallmentAmount();
          }}>
            <option value="full">Full Payment</option>
            <option value="installments">Installments</option>
          </select>
        </label>

        {paymentOption === 'installments' && (
          <label>
            Number of Installments:
            <select value={installments} onChange={handleInstallmentsChange}>
              <option value="">Select Installments</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </label>
        )}

        {installmentAmount > 0 && <p>Installment Amount: KES {installmentAmount}</p>}
        {remainingAmount > 0 && <p>Remaining Amount: KES {remainingAmount}</p>}

        <label>
          <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
          I have read and agree to SmartTik's Privacy Policy, Terms and Conditions
        </label>

        <label>
          <input type="checkbox" checked={subscribeNews} onChange={(e) => setSubscribeNews(e.target.checked)} />
          I accept to receive SmartTik news & updates
          </label>

          <button onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default BookingPage;