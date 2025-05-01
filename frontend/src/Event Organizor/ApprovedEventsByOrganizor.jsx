import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Global Components/Navbar';
import { getUserRole } from '../utils/auth';

const ApprovedEventsByOrganizor = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const userRole = getUserRole();

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/event-organizer/my-events', {
        headers: { Authorization: `${token}` }
      });
      setEvents(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load your events.');
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      <Navbar role={userRole} />
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">My Organized Events</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <p className="text-center text-gray-300 col-span-full">No events found.</p>
          ) : (
            events.map(event => (
              <div key={event.event_id} className="bg-slate-900 rounded-xl p-6 shadow">
                <h2 className="text-xl font-bold mb-2">{event.event_name}</h2>
                <p><span className="font-semibold">Scheduled Date:</span> {event.scheduled_date ? new Date(event.scheduled_date).toLocaleDateString() : 'Not set'}</p>
                <p><span className="font-semibold">Registration Fee:</span> Rs. {event.registration_fee}</p>
                <p><span className="font-semibold">Current Round:</span> {event.current_round}</p>
                <p><span className="font-semibold">Approval Status:</span> {event.approved ? 'Approved' : 'Pending'}</p>
                <hr className="my-2 border-gray-600" />
                {event.venue_name ? (
                  <>
                    <p><span className="font-semibold">Venue:</span> {event.venue_name}</p>
                    <p><span className="font-semibold">Venue Date:</span> {event.venue_date ? new Date(event.venue_date).toLocaleDateString() : 'Not set'}</p>
                    <p><span className="font-semibold">Start Time:</span> {event.start_time}</p>
                    <p><span className="font-semibold">End Time:</span> {event.end_time}</p>
                  </>
                ) : (
                  <p className="text-yellow-400">Venue not assigned yet.</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovedEventsByOrganizor;
