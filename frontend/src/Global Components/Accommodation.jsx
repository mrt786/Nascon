import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccommodationCard from './AccommodationCard';
import { getUserRole } from '../utils/auth'; // Adjust the import path as necessary
const AccommodationPage = () => {
  const navigate = useNavigate();
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

  const handleBook = (acc) => {
    console.log('Booking accommodation:', acc);

    navigate('/booking', { 
      state: { 
        accommodation: { 
          _id: acc.accommodation_id,
          bookingdate: date,
          name: acc.location,
          location: acc.location,
          price: acc.price,
        },
        date 
      } 
    
    });
    window.location.reload(); // Reload the page to reflect the new state
  };

  useEffect(() => {
    if (date) fetchAccommodations();
  }, [date]);
  const userRole = getUserRole(); // Get the user role from the token
  return (

     <div className="bg-slate-800 text-white">
          {/* Navbar */}
          
    
          {/* Hero Section */}
      <div className="min-h-screen bg-slate-800 px-8 py-10 text-white">
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
              <p>Please Select Date to Book An Accomodation </p>
            )}
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default AccommodationPage;
