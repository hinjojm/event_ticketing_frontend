// src/features/user/PaymentHistory.jsx
import React from 'react';
import { FaMoneyBillWave, FaCheckCircle, FaClock, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './PaymentHistory.module.css';

const PaymentHistory = () => {
  // Enhanced payment data with installment tracking
  const payments = [
    {
      id: 'PAY-001',
      eventId: 'jazz-fest-2023', // Add eventId for navigation
      date: '2025-03-15',
      amount: 5000,
      event: 'Nairobi Jazz Festival',
      status: 'completed',
      method: 'M-Pesa',
      type: 'full'
    },
    {
      id: 'PAY-002',
      eventId: 'comedy-night-2025', // Add eventId for navigation
      date: '2025-03-10',
      amount: 1000,
      event: 'Comedy Night',
      status: 'pending', // Partially paid
      method: 'M-Pesa',
      type: 'installment',
      installmentPlan: {
        total: 2000,
        paid: 1000,
        remaining: 1000,
        nextPayment: '2025-04-20',
        installments: 2,
        current: 1
      }
    },
    {
      id: 'PAY-003',
      eventId: 'sports-event-2025', // Add eventId for navigation
      date: '2025-04-01',
      amount: 500,
      event: 'Football Match',
      status: 'pending', // Partially paid
      method: 'Card',
      type: 'installment',
      installmentPlan: {
        total: 1500,
        paid: 500,
        remaining: 1000,
        nextPayment: '2025-04-15',
        installments: 3,
        current: 1
      }
    },
    {
      id: 'PAY-004',
      eventId: 'music-concert-2024', // Add eventId for navigation
      date: '2024-12-20',
      amount: 3000,
      event: 'Summer Music Concert',
      status: 'completed',
      method: 'M-Pesa',
      type: 'full'
    },
    {
      id: 'PAY-005',
      eventId: 'stand-up-comedy-2024', // Add eventId for navigation
      date: '2024-11-05',
      amount: 750,
      event: 'Stand-Up Comedy Show',
      status: 'completed',
      method: 'Card',
      type: 'installment',
      installmentPlan: {
        total: 1500,
        paid: 1500,
        remaining: 0,
        installments: 2,
        current: 2
      }
    },
    {
      id: 'PAY-006',
      eventId: 'marathon-2025', // Add eventId for navigation
      date: '2025-01-10',
      amount: 2500,
      event: 'City Marathon',
      status: 'cancelled',
      method: 'M-Pesa',
      type: 'full',
      cancellationReason: 'Event postponed'
    },
    {
      id: 'PAY-007',
      eventId: 'another-concert-2025', // Add eventId for navigation
      date: '2025-02-15',
      amount: 600,
      event: 'Another Music Event',
      status: 'pending', // Partially paid
      method: 'Airtel Money',
      type: 'installment',
      installmentPlan: {
        total: 1800,
        paid: 600,
        remaining: 1200,
        nextPayment: '2025-04-25',
        installments: 3,
        current: 1
      }
    },
    {
      id: 'PAY-008',
      eventId: 'boxing-match-2024', // Add eventId for navigation
      date: '2024-10-01',
      amount: 4000,
      event: 'Boxing Championship',
      status: 'completed',
      method: 'Card',
      type: 'full'
    },
    {
      id: 'PAY-009',
      eventId: 'art-exhibition-2025', // Add eventId for navigation
      date: '2025-03-25',
      amount: 300,
      event: 'Local Art Exhibition',
      status: 'cancelled',
      method: 'M-Pesa',
      type: 'full',
      cancellationReason: 'Low turnout'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className={styles.completedIcon} />;
      case 'pending':
        return <FaClock className={styles.pendingIcon} />;
      case 'cancelled':
        return <FaTimesCircle className={styles.cancelledIcon} />;
      default:
        return null;
    }
  };

  const getPaymentDetails = (payment) => {
    if (payment.type === 'installment') {
      return (
        <div className={styles.installmentDetails}>
          <div className={styles.installmentProgress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(payment.installmentPlan.paid / payment.installmentPlan.total) * 100}%` }}
              ></div>
            </div>
            <div className={styles.installmentText}>
              Installment {payment.installmentPlan.current} of {payment.installmentPlan.installments}
            </div>
          </div>
          <div className={styles.installmentInfo}>
            <div>
              <span>Paid:</span>
              <span>KSh {payment.installmentPlan.paid.toLocaleString()}</span>
            </div>
            <div>
              <span>Remaining:</span>
              <span>KSh {payment.installmentPlan.remaining.toLocaleString()}</span>
            </div>
            {payment.status === 'pending' && (
              <div className={styles.nextPayment}>
                <FaInfoCircle /> Due by: {payment.installmentPlan.nextPayment}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.paymentHistory}>
      <div className={styles.header}>
        <h2>Payment History</h2>
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span>Total Paid</span>
            <span>KSh {payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>Pending Payments</span>
            <span>KSh {payments
              .filter(p => p.status === 'pending' && p.type === 'installment')
              .reduce((sum, p) => sum + p.installmentPlan.remaining, 0)
              .toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className={styles.paymentTable}>
        <div className={styles.tableHeader}>
          <div>Date</div>
          <div>Amount</div>
          <div>Event</div>
          <div>Method</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {payments.map(payment => (
          <React.Fragment key={payment.id}>
            <div className={styles.paymentRow}>
              <div data-label="Date">{payment.date}</div>
              <div data-label="Amount">KSh {payment.amount.toLocaleString()}</div>
              <div data-label="Event">{payment.event}</div>
              <div data-label="Method">{payment.method}</div>
              <div data-label="Status" className={styles.statusCell}>
                {getStatusIcon(payment.status)}
                <span className={styles[payment.status]}>{payment.status}</span>
                {payment.cancellationReason && <span className={styles.cancellationReason}>({payment.cancellationReason})</span>}
              </div>
              <div data-label="Action">
                {payment.status === 'pending' && payment.type === 'installment' && payment.installmentPlan.remaining > 0 && (
                  <Link
                    to={`/booking/${payment.eventId}/payment`}
                    state={{
                      event: {
                        id: payment.eventId,
                        title: payment.event,
                        // We don't have the full event price here, so we'll pass the remaining
                        // amount and let the BookingPage handle it.
                        price: payment.installmentPlan.total / payment.installmentPlan.installments,
                        // We don't have the date here, you might need to fetch it or store it
                        // in your payment history data if needed on the BookingPage.
                      },
                      paymentOption: 'installment',
                      installmentAmount: payment.installmentPlan.total / payment.installmentPlan.installments,
                      remainingAmount: payment.installmentPlan.remaining
                    }}
                    className={styles.payButton}
                  >
                    Pay Remaining
                  </Link>
                )}
                {payment.status === 'completed' && (
                  <span className={styles.actionCompleted}>Paid</span>
                )}
                {payment.status === 'cancelled' && (
                  <span className={styles.actionCancelled}>Cancelled</span>
                )}
              </div>
            </div>
            {getPaymentDetails(payment)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;