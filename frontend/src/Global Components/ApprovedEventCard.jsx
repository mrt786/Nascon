import React, { useState } from 'react';
import axios from 'axios';

const ApprovedEventCard = ({ event, onAction }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="group relative border rounded-lg shadow-md p-4 transition-all duration-300 bg-slate-900 hover:bg-slate-950-100 cursor-pointer">
  {/* Basic Info (always visible) */}
  <div>
    <h2 className="text-xl font-bold text-orange-500">{event.event_name}</h2>
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

  </div>
</div>
  );
};

export default ApprovedEventCard;