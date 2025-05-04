// File: src/pages/ParticipantRegisterForm.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputBox from '../Global Components/InputBox';
import SimpleButton from '../Global Components/SimpleButton';
import { getUserRole } from '../utils/auth';
import AnimatedForm from '../Animations/AnimatedForms';

const ParticipantRegisterForm = () => {
  const { eventId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const userRole = getUserRole();
  const event = state?.event;

  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (userRole !== 'participant') {
        alert('You are not authorized to access this page. Login as a participant.');
      // redirect non-participants away
      navigate('/login');
    }
    // If navigated without state, fetch minimal event details
    if (!event) {
      // Optionally, fetch event by ID here
    }
  }, [userRole, navigate, event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/participant/register',
        { event_id: eventId, team_name: teamName },
        { headers: { Authorization: token } }
      );
      alert('Registered successfully! Proceed to payment.');
      navigate(`/participant/payment/${eventId}`, { state: { event } });
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. You may have already registered for this event.');
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen text-white">
        <AnimatedForm>
        <h2 className="text-2xl font-bold mb-4 text-orange-500 text-center">
          Register for Event
        </h2>

        {event && (
          <div className="mb-6">
            <p><strong>Event:</strong> {event.event_name}</p>
            <p><strong>Fee:</strong> Rs {event.registration_fee}</p>
            <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <InputBox
                type="text"
                bname="team_name"
                bvalue={teamName}
                change={(e) => setTeamName(e.target.value)}
                placeholder="Team Name (optional)"
                category = {false}
            />
            {error && <p className="text-red-500">{error}</p>}
            <SimpleButton text="Register" type="submit" width="w-full" />
        </form>
        </AnimatedForm>
    </div>
  );
};

export default ParticipantRegisterForm;
