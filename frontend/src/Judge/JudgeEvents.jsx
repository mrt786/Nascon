// File: src/pages/JudgingEventsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
const JudgingEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          'http://localhost:3000/judge/judging-events',
          { headers: { Authorization: `${token}` } }
        );
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch judging events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-slate-800">
        <motion.div
          className="w-12 h-12 border-4 border-dashed border-orange-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-800 min-h-screen text-white pt-4 ">
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">Events You're Judging</h1>
        {events.length === 0 ? (
          <p className="text-center text-gray-400">You are not assigned to judge any events.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(ev => (
              <motion.div
                key={ev.event_id}
                className="group bg-slate-900 rounded-lg p-6 shadow-md border border-orange-500 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-2">{ev.event_name}</h2>
                <p className="text-gray-300 mb-1">Date: {new Date(ev.event_date).toLocaleDateString()}</p>
                <p className="text-gray-300 mb-1">Category: {ev.category}</p>
                <p className="text-gray-300 mb-1">Current Round: {ev.current_round}</p>
                <p className="text-gray-300 mb-1">Registration Fee: Rs {ev.registration_fee}</p>

                {/* Hover reveal description & rules */}
                <div
                  className="max-h-0 overflow-hidden group-hover:max-h-[400px] transition-all duration-700 ease-in-out"
                >
                  <p className=" mt-4 mb-2">{ev.event_description}</p>
                  <p className=" mb-2"><strong>Max Participants:</strong> {ev.max_participants}</p>
                  <p className=" mb-2"><strong>Rules:</strong> {ev.rules} </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JudgingEventsPage;

// Route in App.jsx:
// <Route path="/judge/judging-events" element={<JudgingEventsPage />} />

// Navbar update under 'judge':
// judge: [
//   { path: '/judge-home', label: 'Home' },
//   { path: '/judge/my-events', label: 'My Events' },
//   { path: '/judge/assign-event', label: 'Assign to Event' },
//   { path: '/judge/judging-events', label: 'Judging Events' },
// ],
