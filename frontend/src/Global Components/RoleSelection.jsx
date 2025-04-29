import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedRole = event.target.value;

    if (selectedRole === 'admin') {
      navigate('/admin-login');
    } else if (selectedRole === 'judge') {
      navigate('/judge-login');
    } else if (selectedRole === 'participant') {
      navigate('/participant-login');
    }
    else if (selectedRole === 'sponser')
    {
      navigate('/sponser-login')
    }
    else if (selectedRole === 'event_organizer')
    {
        navigate('/event_organizer')
    }
  };

  return (
        <select
          onChange={handleChange}
          defaultValue=""
          className = "w-full p-2 rounded-md text-black placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500"        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="judge">Judge</option>
          <option value="participant">Participant</option>
          <option value="sponser">Sponser</option>
          <option value="event_organizer">Event Organizer</option>
        </select>
  );
};

export default RoleSelector;