
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Global Components/Navbar';
import { getUserRole } from '../utils/auth';
import LoginButton from '../Global Components/LoginButton';
import SimpleButton from '../Global Components/SimpleButton';

const SponsorEventPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userRole = getUserRole();

  const fetchApproved = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/sponsors/approved-events', {
        headers: { Authorization: `${token}` }
      });
      console.log(res.data);
      setEvents(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load approved events.');
    }
  };

  useEffect(() => { fetchApproved(); }, []);

  const handleSelect = async (eventId, sponsorLevel) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/sponsors/select-package',
        { event_id: eventId, sponsor_level: sponsorLevel },
        { headers: { Authorization: `${token}` } }
      );
      const { payment_id } = res.data;
      console.log("Navigating to payment page with payment_id:");
      navigate(`/sponsor/payments`, { state: { event_id: eventId, sponsor_level: sponsorLevel } });
    } catch (err) {
      alert(err.response?.data?.error || 'Package selection failed.');
    }
  };
  const SetSponsortype = (type) => {
    if (type === 'silver_sponsor') {
      return 'Silver Sponsor';
    }
    else if (type === 'gold_sponsor') {
      return 'Gold Sponsor';
    }
    else if (type === 'title_sponsor') {
      return 'Title Sponsor';
    }
    else if (type === 'media_partner') {
      return 'Media Partner';
    }

  };
  
  const SetCategory = (type) => {
    if (type === 'tech_event') {
      return 'Tech Event';
    }
    else if (type === 'business_event') {
      return 'Business Event';
    }
    else if (type === 'gaming_tournament') {
      return 'Gaming Tournament';
    }
    else if (type === 'general_event') {
      return 'General Event';
    }   

  };
  return (
    <div className="bg-slate-800 min-h-screen text-white">
      <Navbar role={userRole} />
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">Available Sponsorships</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(ev => (
            <div key={`${ev.event_id}-${ev.sponsor_level}"`} className="bg-slate-900 text-white rounded-xl shadow p-6 ">
              <h2 className="text-xl font-semibold mb-2">{ev.event_name}</h2>
              <p className="text-sm mb-1">Date: {new Date(ev.event_date).toLocaleDateString()}</p>
              <p className="text-sm mb-1">Category: {SetCategory(ev.category)}</p>
              <p className="text-sm mb-1">Level: {SetSponsortype(ev.sponsor_level)}</p>
              <p className="text-sm mb-4">Amount: Rs. {ev.sponsor_amount}</p>
              <SimpleButton text={'Select Package'}  onClick={() => handleSelect(ev.event_id, ev.sponsor_level)} width='w-full' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SponsorEventPage;



