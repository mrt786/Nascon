import React, { useState } from 'react';
import axios from 'axios';

const PendingEventCard = ({ event, onAction }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/admin/approve-event',
        { event_id: event.event_id },
        { headers: { Authorization: `${token}` } }
      );
      onAction();
    } catch (err) {
      setError(err.response?.data?.error || 'Approval failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:3000/admin/reject-event-by-admin/${event.event_id}`,
        { headers: { Authorization: `${token}` } }
      );
      onAction();
    } catch (err) {
      setError(err.response?.data?.error || 'Rejection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative border rounded-lg shadow-md p-4 transition-all duration-300 bg-slate-900 hover:bg-slate-950-100 cursor-pointer">
  {/* Basic Info (always visible) */}
  <div>
    <h2 className="text-xl font-bold text-orange-500">{event.event_name}</h2>
    <p className="text-sm text-white"><strong>ID: </strong> {event.event_id}</p>
    <p className="text-sm text-white"><strong>Fee: Rs</strong> {event.registration_fee}</p>
  </div>

  {/* Expanded Info (shown on hover only) */}
  <div className="max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-[500px] group-hover:mt-4">
    <p><strong>Category:</strong> {event.category}</p>
    <p><strong>Date:</strong> {event.event_date}</p>
    <p><strong>Round:</strong> {event.current_round}</p>
    <p><strong>Max Participants:</strong> {event.max_participants}</p>
    <p><strong>Rules:</strong> {event.rules}</p>
    <p><strong>Description:</strong> {event.event_description}</p>

    {/* Action Buttons */}
    <div className="flex gap-4 mt-4">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleApprove}
        disabled={loading}
      >
        Approve
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleReject}
        disabled={loading}
      >
        Reject
      </button>
    </div>
  </div>
</div>
  );
};

export default PendingEventCard;