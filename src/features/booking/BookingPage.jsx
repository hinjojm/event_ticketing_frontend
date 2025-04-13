import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './BookingPage.module.css';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, quantity, fullName, email, phoneNumber, ticketType, remainingAmount: initialRemainingAmount } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentOption, setPaymentOption] = useState(initialRemainingAmount > 0 ? 'installment' : 'full'); // Default to installment if there's a remaining amount
  const [installments, setInstallments] = useState(2);
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNews, setSubscribeNews] = useState(false);
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(initialRemainingAmount || 0); // Initialize with passed remaining amount
  const [mobileNumber, setMobileNumber] = useState(phoneNumber || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const getTicketPrice = () => {
    switch (ticketType) {
      case 'vip':
        return event?.vipPrice || event?.price * 1.5;
      case 'vvip':
        return event?.vvipPrice || event?.price * 2;
      default:
        return event?.price;
    }
  };

  useEffect(() => {
    const calculatedTotalAmount = getTicketPrice() * (quantity || 1);
    setTotalAmount(calculatedTotalAmount);

    if (paymentOption === 'installments') {
      setInstallmentAmount(calculatedTotalAmount / installments);
    } else {
      setInstallmentAmount(calculatedTotalAmount);
    }

    if (event?.id && phoneNumber) {
      loadPaymentRecords();
    }
  }, [paymentOption, installments, quantity, event?.id, phoneNumber, event?.price, event?.vipPrice, event?.vvipPrice, ticketType]);

  const loadPaymentRecords = () => {
    const records = JSON.parse(localStorage.getItem(`paymentRecords_${event?.id}_${phoneNumber}`)) || [];
    setPaymentRecords(records);
    calculateRemainingAmount(records);
  };

  const calculateRemainingAmount = (records) => {
    const totalPaid = records.reduce((sum, record) => sum + record.amount, 0);
    setRemainingAmount(Math.max(0, totalAmount - totalPaid));
  };

  const handlePayment = () => {
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions.');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    if (paymentMethod === 'M-Pesa' && !/^07\d{8}$/.test(mobileNumber)) {
      alert('Please enter a valid M-Pesa number starting with 07 followed by 8 digits');
      return;
    }

    const amountToPay = paymentOption === 'installments' ? installmentAmount : remainingAmount > 0 ? remainingAmount : totalAmount;

    const paymentData = {
      eventId: event?.id,
      eventTitle: event?.title,
      ticketType,
      quantity,
      paymentMethod,
      paymentOption,
      installments: paymentOption === 'installments' ? installments : 1,
      amount: amountToPay,
      fullName,
      email,
      phoneNumber,
      subscribeNews,
      paymentDate: new Date().toISOString(),
    };

    if (event?.id && phoneNumber) {
      const newRecords = [...paymentRecords, paymentData];
      localStorage.setItem(`paymentRecords_${event.id}_${phoneNumber}`, JSON.stringify(newRecords));
      calculateRemainingAmount(newRecords); // Update remaining amount after payment
    }

    // Simulate payment processing
    setTimeout(() => {
      alert(
        `Payment of KES ${paymentData.amount.toLocaleString()} for ${
          ticketType ? ticketType.toUpperCase() : 'ticket'
        }(s) was successful!`
      );
      navigate('/confirmation', { state: { paymentData } });
    }, 1000);
  };

  if (!event) {
    return (
      <div className={styles.notFound}>
        <Header />
        <div className={styles.errorContainer}>
          <h2>Event details not found</h2>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  if (totalAmount === 0) {
    return (
      <div className={styles.freeEventContainer}>
        <Header />
        <div className={styles.freeEventContent}>
          <h1>{event.title}</h1>
          <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
          <div className={styles.freeEventInfo}>
            <p>This is a free event! Your reservation is confirmed.</p>
            <button onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.eventSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryCard}>
            <img src={event.imageUrl} alt={event.title} className={styles.eventThumbnail} />
            <div className={styles.summaryDetails}>
              <h3>{event.title}</h3>
              <p className={styles.ticketType}>{ticketType?.toUpperCase() || 'Ticket'}</p>
              <p>Quantity: {quantity}</p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className={styles.summaryPrice}>KES {totalAmount.toLocaleString()}</div>
          </div>
        </div>

        <div className={styles.paymentSection}>
          <h2>Payment Details</h2>

          <div className={styles.paymentMethod}>
            <h3>Payment Method</h3>
            <div className={styles.paymentOptions}>
              <button
                className={`${styles.paymentOption} ${paymentMethod === 'M-Pesa' ? styles.selected : ''}`}
                onClick={() => setPaymentMethod('M-Pesa')}
              >
                M-Pesa
              </button>
              <button
                className={`${styles.paymentOption} ${paymentMethod === 'Airtel Money' ? styles.selected : ''}`}
                onClick={() => setPaymentMethod('Airtel Money')}
              >
                Airtel Money
              </button>
              <button
                className={`${styles.paymentOption} ${paymentMethod === 'Visa Card' ? styles.selected : ''}`}
                onClick={() => setPaymentMethod('Visa Card')}
              >
                Credit Card
              </button>
            </div>

            {paymentMethod === 'M-Pesa' || paymentMethod === 'Airtel Money' ? (
              <div className={styles.mobilePayment}>
                <label>Mobile Number</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="e.g. 0712345678"
                />
                <p className={styles.note}>You'll receive a payment request on your phone</p>
              </div>
            ) : paymentMethod === 'Visa Card' ? (
              <div className={styles.cardPayment}>
                <label>Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />

                <div className={styles.cardRow}>
                  <div className={styles.cardGroup}>
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                    />
                  </div>

                  <div className={styles.cardGroup}>
                    <label>CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>

                <label>Billing Address</label>
                <input
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="Your billing address"
                />
              </div>
            ) : null}
          </div>

          <div className={styles.paymentPlan}>
            <h3>Payment Plan</h3>
            <div className={styles.planOptions}>
              <button
                className={`${styles.planOption} ${paymentOption === 'full' ? styles.selected : ''}`}
                onClick={() => setPaymentOption('full')}
                disabled={initialRemainingAmount > 0} // Disable full payment if there's a remaining amount
              >
                Full Payment
                <span>KES {totalAmount.toLocaleString()}</span>
              </button>

              <button
                className={`${styles.planOption} ${paymentOption === 'installments' ? styles.selected : ''}`}
                onClick={() => setPaymentOption('installments')}
              >
                Installments
                <span>{installments} payments of KES {(totalAmount / installments).toLocaleString()}</span>
              </button>
            </div>

            {paymentOption === 'installments' && (
              <div className={styles.installmentControls}>
                <label>Number of Installments</label>
                <select value={installments} onChange={(e) => setInstallments(Number(e.target.value))}>
                  <option value={2}>2 payments</option>
                  <option value={3}>3 payments</option>
                  <option value={4}>4 payments</option>
                </select>

                {paymentRecords.length > 0 && (
                  <div className={styles.paymentHistory}>
                    <h4>Payment History</h4>
                    {paymentRecords.map((record, index) => (
                      <div key={index} className={styles.paymentRecord}>
                        <span>Payment #{index + 1}</span>
                        <span>KES {record.amount.toLocaleString()}</span>
                        <span>{new Date(record.paymentDate).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.amountSummary}>
                  <div>
                    <span>Next Payment:</span>
                    <span>KES {installmentAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span>Remaining Balance:</span>
                    <span>KES {remainingAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.termsSection}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span>
                I agree to the <a href="/terms">Terms and Conditions</a> and{' '}
                <a href="/privacy">Privacy Policy</a>
              </span>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={subscribeNews}
                onChange={(e) => setSubscribeNews(e.target.checked)}
              />
              <span>Subscribe to newsletter and event updates</span>
            </label>
          </div>

          <button
            onClick={handlePayment}
            className={styles.payButton}
            disabled={!paymentMethod || !agreeTerms}
          >
            {remainingAmount > 0 ? 'Pay Remaining KES ' + remainingAmount.toLocaleString() : paymentOption === 'installments' ? 'Pay Installment KES ' + installmentAmount.toLocaleString() : 'Complete Payment KES ' + totalAmount.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;