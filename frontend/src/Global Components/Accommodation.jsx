import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccommodationCard from './AccommodationCard';
const AccommodationPage = ({ userId }) => {
  const [date, setDate] = useState('');
  const [accommodations, setAccommodations] = useState([]);

  const fetchAccommodations = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/accommodations/available`);
      console.log(res.data)
      setAccommodations(res.data);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    }
  };

  const handleBook = async (acc) => {
    console.log(acc)
    try {
      const response = await axios.post('http://localhost:3000/accommodations/book', {
        userId,
        accommodationId: acc._id,
        location: acc.location,
        date,
      });
      alert('Booking successful!');
    } catch (err) {
      alert('Error booking accommodation. Try again.');
    }
  };

  useEffect(() => {
    if (date) fetchAccommodations();
  }, [date]);

  return (
    <div className="min-h-screen bg-slate-900 px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Book Your Accommodation</h1>
      <div className="mb-6 text-center">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-pink-500  text-black"
        />
      </div>

      {/* {date && ( */}
        <div className="flex flex-wrap gap-6 justify-center">
          {accommodations.length > 0 ? (
            accommodations.map((acc) => (
              <AccommodationCard key={acc._id} accommodation={acc} onBook={handleBook} />
            ))
          ) : (
            <p>No accommodations available for this date.</p>
          )}
        </div>
      {/* )} */}
    </div>
  );
};

export default AccommodationPage;
