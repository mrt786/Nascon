// File: src/pages/ParticipantPaymentForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Global Components/Navbar';
import InputBox from '../Global Components/InputBox';
import SimpleButton from '../Global Components/SimpleButton';
import { getUserRole } from '../utils/auth';
import AnimatedForm from '../Animations/AnimatedForms';

const ParticipantPaymentForm = () => {
  const { eventId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const userRole = getUserRole();
  const event = state?.event;
  const [amountPaid, setAmountPaid] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (userRole !== 'participant') {
      navigate('/login');
    }
  }, [userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!amountPaid || isNaN(amountPaid) || Number(amountPaid) < event.registration_fee || Number(amountPaid) > event.registration_fee) {
      setError('Please enter a valid amount.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/participant/complete-payment',
        { event_id: eventId, amount_paid: Number(amountPaid) },
        { headers: { Authorization: `${token}` } }
      );
      alert('Payment completed successfully.');
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed.');
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      <Navbar role={userRole} />
      <AnimatedForm>
        <h2 className="text-2xl font-bold mb-4 text-orange-500 text-center">Complete Payment</h2>

        {event && (
          <div className="mb-6">
            <p><strong>Event:</strong> {event.event_name}</p>
            <p><strong>Registration Fee:</strong> Rs {event.registration_fee}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputBox
            type="number"
            bname="amount_paid"
            bvalue={amountPaid}
            change={(e) => setAmountPaid(e.target.value)}
            placeholder="Enter Amount Paid"
          />
          {error && <p className="text-red-500">{error}</p>}
          <SimpleButton text="Pay Now" type="submit" width="w-full" />
        </form>
      </AnimatedForm>
    </div>
  );
};

export default ParticipantPaymentForm;
