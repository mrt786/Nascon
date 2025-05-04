import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AnimatedForm from '../Animations/AnimatedForms';

const SponsorIncomeReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          'http://localhost:3000/event-organizer/sponsor-income-report',
          { headers: { Authorization: `${token}` } }
        );
        setReport(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Failed to fetch report.');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-800">
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

      <div className="max-w-5xl mx-auto px-4 py-8">
        <AnimatedForm>
          <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
            Sponsor Income Report
          </h1>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          {!report ? null : (
            <table className="w-full table-auto bg-slate-900 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-slate-700">
                  <th className="px-4 py-2">Event ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Max Participants</th>
                  <th className="px-4 py-2">Total Sponsor Amount</th>
                </tr>
              </thead>
              <tbody>
                {report.events.map((evt) => (
                  <motion.tr
                    key={evt.event_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border-b border-slate-700 hover:bg-slate-800"
                  >
                    <td className="px-4 py-2 text-center">{evt.event_id}</td>
                    <td className="px-4 py-2">{evt.event_name}</td>
                    <td className="px-4 py-2 text-center">
                      {new Date(evt.event_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 capitalize text-center">{evt.category.replace('_', ' ')}</td>
                    <td className="px-4 py-2 text-center">{evt.max_participants}</td>
                    <td className="px-4 py-2 text-center text-green-400">
                      Rs {evt.sponsor_amount}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </AnimatedForm>
      </div>
    </div>
  );
};

export default SponsorIncomeReport;
