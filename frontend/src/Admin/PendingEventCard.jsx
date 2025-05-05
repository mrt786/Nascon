import React, { useState } from 'react';
import axios from 'axios';
import SimpleButton from '../Global Components/SimpleButton';

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
    <div className="group relative border rounded-lg shadow-md p-4 transition-all duration-300 border-orange-500 cursor-pointer max-w-md bg-slate-900">
  {/* Basic Info (always visible) */}
  <div>
    <h2 className="text-xl font-bold text-orange-500">{event.event_name}</h2>
    <p><strong>Category:</strong> {event.category}</p>
    <p className="text-sm text-white"><strong>Fee: Rs</strong> {event.registration_fee}</p>
    <p><strong>Date:</strong> {event.event_date}</p>
  </div>

  {/* Expanded Info (shown on hover only) */}
  <div className="max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-[500px] group-hover:mt-4">


    <p><strong>Round:</strong> {event.current_round}</p>
    <p><strong>Max Participants:</strong> {event.max_participants}</p>
    <p><strong>Rules:</strong> {event.rules}</p>
    <p><strong>Description:</strong> {event.event_description}</p>

    {/* Action Buttons */}
    <div className="flex gap-4 mt-4">
      <SimpleButton onClick={handleApprove} text={"Approve"} />
      <SimpleButton onClick={handleReject} text={"Reject"}  />
    </div>
  </div>
</div>
  );
};

export default PendingEventCard;