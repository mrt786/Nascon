
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SimpleButton from '../Global Components/SimpleButton';
import { toast } from 'sonner';

const SponsorPaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/sponsors/payments', {
        headers: { Authorization: `${token}` }
      });
      setPayments(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load payments.');
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  const handlePay = (paymentId, eventId, sponsorLevel) => {
    try {
      const token = localStorage.getItem('token');
      const res = axios.post('http://localhost:3000/sponsors/pay', 
        { payment_id: paymentId , event_id:  eventId, sponsor_level: sponsorLevel}, 
        
        {headers: { Authorization: `${token}` }
      });
      console.log(res.data);
      window.location.reload();
      toast.success('Payment successful!');

    } catch (err) {
      toast.error(err.response?.data?.error || 'Payment failed.');
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">Your Sponsorship Payments</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="space-y-4">
          {payments.length === 0 && (
            <p className="text-center text-white-400">No payments found.</p>
          )}
          {payments && [...new Map(payments.map(p => [p.payment_id, p])).values()].map(p => (
        <div key={p.payment_id} className="bg-slate-900 border border-orange-500 text-white rounded-xl shadow p-4 flex justify-between items-center">
        <div>
          <p>Payment ID: {p.payment_id}</p>
          <p>Event: {p.event_name}</p>
          <p>Amount: {p.amount}</p>
          <p>Status: {p.payment_status ? 'Paid' : 'Pending'}</p>
        </div>
        {!p.payment_status && (
          <SimpleButton
            text="Pay Now"
            btype="button"
            onClick={() => handlePay(p.payment_id, p.event_id, p.sponsor_level)}
          />
        )}
        </div>
        ))}
      </div>
      </div>
    </div>
  );
};
export default SponsorPaymentsPage;


