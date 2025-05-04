import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    } else if (selectedRole === 'sponsor') {
      navigate('/sponsor-login');
    } else if (selectedRole === 'event_organizer') {
      navigate('/event_organizer-login');
    
    }
    // window.location.reload(); 
  };

  return (
    <motion.select
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileFocus={{ scale: 1.02, borderColor: "#D4A6A1", boxShadow: "0 0 8px #D4A6A1" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onChange={handleChange}
      defaultValue=""
      className="w-full p-2 rounded-md text-black placeholder-slate-400  focus:outline-none focus:ring-2"
    >
      <option value="" disabled>Select Role</option>
      <option value="admin">Admin</option>
      <option value="judge">Judge</option>
      <option value="participant">Participant</option>
      <option value="sponsor">Sponsor</option>
      <option value="event_organizer">Event Organizer</option>
    </motion.select>
  );
};

export default RoleSelector;
