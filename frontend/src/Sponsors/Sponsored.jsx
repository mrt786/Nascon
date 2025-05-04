import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const SponsoredEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsored = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          'http://localhost:3000/sponsors/my-sponsored-events',
          { headers: { Authorization: `${token}` } }
        );
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch sponsored events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsored();
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
    <div className="bg-slate-800 min-h-screen text-white pt-20">

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-orange-500 font-bold text-center mb-8">My Sponsored Events</h1>

        {events.length === 0 ? (
          <p className="text-center text-white">You haven't sponsored any events yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
              <motion.div
                key={e.event_id}
                className="bg-slate-900 rounded-lg p-6 shadow-md border border-orange-500 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-2">{e.event_name}</h2>
                <p className="text-white mb-1">
                  <strong>Date:</strong> {new Date(e.event_date).toLocaleDateString()}
                </p>
                <p className="text-white mb-1">
                  <strong>Category:</strong> {e.category}
                </p>
                <p className="text-white mb-1">
                  <strong>Level:</strong> {e.sponsor_level.replace('_', ' ')}
                </p>
                <p className="text-white mb-1">
                  <strong>Amount:</strong> Rs {e.sponsor_amount}
                </p>
                <p className="text-white mb-1">
                  <strong>Status:</strong>{' '}
                  {e.payment_status ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    <span className="text-yellow-400">Pending</span>
                  )}
                </p>

                {/* Hidden details on hover */}
                <div className="mt-4 max-h-0 overflow-hidden group-hover:max-h-[400px] transition-all duration-700 ease-in-out">
                  <p className="text-white mb-2">{e.event_description}</p>
                  <p className="text-white mb-2"><strong>Current Round:</strong> {e.current_round}</p>
                  <p className="text-white mb-2"><strong>Max Participants:</strong> {e.max_participants}</p>
                  <p className="text-white mb-2"><strong>Rules:</strong> {e.rules}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsoredEventsPage;
