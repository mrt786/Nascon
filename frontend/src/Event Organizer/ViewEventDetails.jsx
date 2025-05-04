import React, { useState } from 'react';
import axios from 'axios';
import InputBox from '../Global Components/InputBox';
import SimpleButton from '../Global Components/SimpleButton';
import AnimatedForm from '../Animations/AnimatedForms';

const ViewEventDetails = () => {
  const [eventId, setEventId] = useState('');
  const [eventDetails, setEventDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEventDetails = async () => {
    if (!eventId) {
      setError('Please enter an Event ID.');
      return;
    }
    setLoading(true);
    setError('');

    try {
        const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/event-organizer/event/${eventId}`,
        { headers: { Authorization: `${token}` } }
      );
      setEventDetails(response.data);
    } catch (err) {
      console.error(err);
      setEventDetails(null);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to fetch event details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pt-20  '>

    <div className="max-w-2xl mx-auto  bg-slate-900 rounded-2xl shadow-xl">
    <AnimatedForm>

            
    <h2 className="text-2xl font-bold mb-4 text-orange-500 text-center">View Event Details</h2>
      
      <div className="flex flex-col gap-4">
        <InputBox change={ (e) => setEventId(e.target.value)} bname="event_id" bvalue={eventId} placeholder="Event ID" />
        <SimpleButton onClick={fetchEventDetails} text = {loading ? 'Loading...' : 'Fetch Event Details'} type = 'button' width='w-full' />           
                
        {error && <div className="text-red-500">{error}</div>}

        {eventDetails && (
          <div className="mt-6 border-t pt-4 text-white">
            <h3 className="text-xl font-semibold mb-2">{eventDetails.event_name}</h3>
            <p><strong>Category:</strong> {eventDetails.category}</p>
            <p><strong>Date:</strong> {new Date(eventDetails.event_date).toLocaleDateString()}</p>
            <p><strong>Registration Fee:</strong> Rs. {eventDetails.registration_fee}</p>
            <p><strong>Current Round:</strong> {eventDetails.current_round}</p>
            <p><strong>Max Participants:</strong> {eventDetails.max_participants}</p>
            <p><strong>Approved:</strong> {eventDetails.approved ? 'Yes' : 'No'}</p>
            <div className="mt-3">
              <h4 className="font-semibold">Rules:</h4>
              <p >{eventDetails.rules}</p>
            </div>
            <div className="mt-3">
              <h4 className="font-semibold">Description:</h4>
              <p >{eventDetails.event_description}</p>
            </div>
          </div>
        )}
      </div>
    </AnimatedForm>
    </div>
    </div>
  );
};

export default ViewEventDetails;
