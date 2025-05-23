import React, { useState } from 'react';
import axios from 'axios';

import { getUserRole } from '../utils/auth';
import InputBox from '../Global Components/InputBox';
import LoginButton from '../Global Components/LoginButton';
import { motion } from 'framer-motion';
import AnimatedForm from '../Animations/AnimatedForms';
const OrganizeEvent = () => {
  const [formData, setFormData] = useState({
    category: '',
    event_name: '',
    event_date: '',
    registration_fee: '',
    current_round: '',
    rules: '',
    event_description: '',
    max_participants: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { category, event_name, event_date, registration_fee, current_round, max_participants } = formData;

    if (!category || !event_name || !event_date || !registration_fee || !current_round || !max_participants) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    if (max_participants <= 0) {
      setError('Max participants must be greater than 0.');
      return;
    }
    setError('');
    if (registration_fee <= 0) {
        setError('Registration fee can be greater than zero.');
        return;
    }
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to organize an event.');
      return;
    }


    console.log(formData)
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/event-organizer/send-event-for-approval',
        formData,
        { headers: { Authorization: `${token}` } }
      );
      setSuccess('Event sent for approval!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send event.');
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      

      <div className="flex items-center justify-center py-10 px-4 ">
        <div className='min-w-sm max-w-md'>

        <AnimatedForm>
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Organize Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.select
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileFocus={{ scale: 1.02, borderColor: "#D4A6A1", boxShadow: "0 0 8px #D4A6A1" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onChange={handleChange}
                name= "category"
                value={formData.category}
                className="w-full p-2 rounded-md text-black placeholder-slate-400  focus:outline-none focus:ring-2"
              >
                <option value="" >Select Event Category</option>
                <option value="tech_event">Tech Event</option>
                <option value="business_event">Business Event</option>
                <option value="gaming_tournament">Gaming Tournament</option>
                <option value="general_event">General Event</option>
                <option value="event_organizer">Event Organizer</option>
            </motion.select>
                      
            <InputBox
              type="text"
              bname="event_name"
              bvalue={formData.event_name}
              change={handleChange}
              placeholder="Event Name"
            />
            <InputBox
              type="date"
              bname="event_date"
              bvalue={formData.event_date}
              change={handleChange}
              placeholder="Event Date"
            />
            <InputBox
              type="number"
              bname="registration_fee"
              bvalue={formData.registration_fee}
              change={handleChange}
              placeholder="Registration Fee"
            />
                        <motion.select
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileFocus={{ scale: 1.02, borderColor: "#D4A6A1", boxShadow: "0 0 8px #D4A6A1" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onChange={handleChange}
                value={formData.current_round}
                name="current_round"
                className="w-full p-2 rounded-md text-black placeholder-slate-400  focus:outline-none focus:ring-2"
              >
                <option value="" >Select Round Type</option>
                <option value="prelims">PreLims</option>
                <option value="semi-finals">Semi Final</option>
                <option value="finals">Final</option>
            </motion.select>
            <InputBox
              type="text"
              bname="rules"
              bvalue={formData.rules}
              change={handleChange}
              placeholder="Rules"
            />
            <InputBox
              type="text"
              bname="event_description"
              bvalue={formData.event_description}
              change={handleChange}
              placeholder="Event Description"
            />
            <InputBox
              type="number"
              bname="max_participants"
              bvalue={formData.max_participants}
              change={handleChange}
              placeholder="Max Participants"
            />

            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <LoginButton text="Submit Event" btype="submit" />
          </form>
        </AnimatedForm>
        </div>
      </div>
    </div>
  );
};

export default OrganizeEvent;

