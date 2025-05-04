

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
const FinanceReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          'http://localhost:3000/admin/reports/finance',
          { headers: { Authorization: `${token}` } }
        );
        setReport(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Failed to load finance report.');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const headers = report.length > 0 ? Object.keys(report[0]) : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-800">
        <motion.div
          className="w-12 h-12 border-4 border-dashed border-pink-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-800 min-h-screen text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Finance Report
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {report.length === 0 ? (
          <p className="text-center text-gray-400">No finance data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-700">
                  {headers.map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 text-left text-sm font-medium uppercase text-gray-300"
                    >
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {report.map((row, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="border-b border-slate-700 hover:bg-slate-800"
                  >
                    {headers.map((key) => (
                      <td key={key} className="px-4 py-2 text-sm text-gray-200">
                        {row[key]}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceReport;
