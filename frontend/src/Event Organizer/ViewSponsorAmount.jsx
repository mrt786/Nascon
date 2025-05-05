

import React, { useState } from 'react';
import axios from 'axios';
import InputBox from '../Global Components/InputBox';
import SimpleButton from '../Global Components/SimpleButton';
import AnimatedForm from '../Animations/AnimatedForms';

const ViewSponsorAmount = () => {
  const [eventId, setEventId] = useState('');
  const [sponsorData, setSponsorData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSponsorAmount = async () => {
    if (!eventId) {
      setError('Please enter an Event ID.');
      return;
    }
    setLoading(true);
    setError('');
    setSponsorData(null);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:3000/event-organizer/event-sponsor-amount/${eventId}`,
        { headers: { Authorization: `${token}` } }
      );
      setSponsorData(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) setError(err.response.data.error);
      else setError('Failed to fetch sponsor amount.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-slate-800 min-h-screen flex items-start pt-20 justify-center">
      {/* <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl"> */}
        <AnimatedForm>
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
            View Sponsor Amount
          </h2>

          <div className="space-y-4">
            <InputBox
              type="text"
              placeholder="Event ID"
              bname="eventId"
              bvalue={eventId}
              change={(e) => setEventId(e.target.value)}
            />

            <SimpleButton
              onClick={fetchSponsorAmount}
              text={loading ? 'Loading...' : 'Fetch Amount'}
              type="button"
              width="w-full"
            />

            {error && <p className="text-red-600 text-center">{error}</p>}

            {sponsorData && (
              <div className="mt-6 text-xl bg-slate-800 rounded-md p-4 text-white">
                <p>
                  <strong>Event ID:</strong> {sponsorData.event_id}
                </p>
                <p className="mt-2 ">
                  <strong>Total Sponsor Amount: </strong>
                  Rs {sponsorData.sponsor_amount}
                </p>
              </div>
            )}
          </div>
        </AnimatedForm>
      </div>
    // </div>
  );
};

export default ViewSponsorAmount;
