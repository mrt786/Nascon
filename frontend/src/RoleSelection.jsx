import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedRole = event.target.value;

    if (selectedRole === 'admin') {
      navigate('/admin-login');
    } else if (selectedRole === 'judge') {
      navigate('/judge');
    } else if (selectedRole === 'participant') {
      navigate('/participant-login');
    }
  };

  return (
        <select
          onChange={handleChange}
          defaultValue=""
          className="w-full p-2 rounded-md bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="judge">Judge</option>
          <option value="participant">Participant</option>
        </select>
  );
};

export default RoleSelector;