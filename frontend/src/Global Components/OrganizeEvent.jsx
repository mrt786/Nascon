import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { getUserRole } from '../utils/auth';
import InputBox from './InputBox';
import LoginButton from './LoginButton';

const OrganizeEvent = () => {
  const navigate = useNavigate();
  const userRole = getUserRole();
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
      // Optionally navigate to organizer dashboard:
      // navigate('/event-organizer-home');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send event.');
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      <Navbar role={userRole} />

      <div className="flex items-center justify-center py-10 px-4">
        <div className="bg-slate-900 text-black rounded-2xl shadow-xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Organize Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
                onChange={handleChange}
                value={formData.category}
                name="category"
                defaultValue=""
                className = "w-full p-2 rounded-md text-black placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500"        >
                <option value="" >Select Event Category</option>
                <option value="tech_event">Tech Event</option>
                <option value="business_event">Business Event</option>
                <option value="gaming_tournament">Gaming Tournament</option>
                <option value="general_event">General Event</option>
                <option value="event_organizer">Event Organizer</option>
            </select>


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
            <select
                onChange={handleChange}
                value={formData.current_round}
                name="current_round"
                defaultValue=""
                className = "w-full p-2 rounded-md text-black placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500"        >
                <option value="" >Select Round Type</option>
                <option value="prelims">PreLims</option>
                <option value="semi-finals">Semi Final</option>
                <option value="finals">Final</option>
            </select>
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
        </div>
      </div>
    </div>
  );
};

export default OrganizeEvent;

// Usage: Add route in your App.jsx:
// <Route path="/organize-event" element={<OrganizeEvent />} />
