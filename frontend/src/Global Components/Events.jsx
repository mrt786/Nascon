import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserRole } from '../utils/auth';
import ApprovedEventCard from './ApprovedEventCard';

const ApprovedEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const userRole = getUserRole();

  const fetchPendingEvents = async () => {
    console.log("Fetching pending events...");
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        'http://localhost:3000/events/get-event-details',
      );
      console.log(res.data);
      setEvents(res.data);
    } catch (err) {
        // console.log('The response while fetching eveents: ', res.data)
      setError(err.response?.data?.error || 'Failed to load pending events.');
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-orange-500  mb-6">Event Details</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex flex-wrap gap-6 justify-center">
          {events.length > 0 ? (
            events.map(event => (
              <ApprovedEventCard
                key={event.event_id}
                event={event}
                onAction={fetchPendingEvents}
              />
            ))
          ) : (
            <p className="text-center">No pending events.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovedEventsPage;
