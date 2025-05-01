import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Global Components/Navbar';
import InputBox from '../Global Components/InputBox';
import SimpleButton from '../Global Components/SimpleButton';
import { getUserRole } from '../utils/auth';

const AssignToEventForm = () => {
  const [eventId, setEventId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const userRole = getUserRole();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/judge/assign-to-event',
        { event_id: eventId },
        { headers: { Authorization: `${token}` } }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Assignment failed.');
    }
  };

  if (userRole !== 'judge') {
    return <p className="text-center text-red-500 mt-10">Access denied. Judges only.</p>;
  }

  return (
    <div className="bg-slate-800 min-h-screen text-white flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Assign to Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputBox
            type="number"
            bname="event_id"
            bvalue={eventId}
            change={(e) => setEventId(e.target.value)}
            placeholder="Event ID"
          />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <SimpleButton text="Assign" type="submit" width="w-full" />
        </form>
      </div>
    </div>
  );
};

export default AssignToEventForm;