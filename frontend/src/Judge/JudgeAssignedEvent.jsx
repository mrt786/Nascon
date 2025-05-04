import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserRole } from '../utils/auth';
import SimpleButton from '../Global Components/SimpleButton';

const JudgeAssignedEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const userRole = getUserRole();

  const fetchEvents = async () => {
    console.log("Trying to fetch events...");
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/judge/my-events', {
        headers: { Authorization: `${token}` }
      });
      setEvents(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load your events.');
    }
  };

  useEffect(() => {
    if (userRole !== 'judge') return;
    fetchEvents();
  }, []);

  if (userRole !== 'judge') {
    return <p className="text-center text-red-500 mt-10">Access denied. Judges only.</p>;
  }

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">My Assigned Events</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <p className="col-span-full text-center text-gray-300">No events assigned.</p>
          ) : events.map(ev => (
            <div key={ev.event_id} className="bg-slate-900 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-orange-500">{ev.event_name}</h2>
              <p>Date: {new Date(ev.event_date).toLocaleDateString()}</p>
              <p>Category: {ev.category}</p>
              <SimpleButton
                text="Submit Score"
                onClick={() => window.location.href = `/judge/submit-score/${ev.event_id}`}
                width="w-full mt-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JudgeAssignedEvents;