import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserRole } from '../utils/auth';
import LoginButton from './LoginButton';
import InputBox from './InputBox';
import AnimatedForm from '../Animations/AnimatedForms';
import { toast } from 'sonner';
const BookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { accommodation, date } = state || {};
  const [bookingDate] = useState(date);
  const [error, setError] = useState('');
  const [formdata , setFormdata] = useState({
    accid: accommodation['_id'],
    date: bookingDate,
    capacity: 1,
    price:  accommodation['price'],

  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'capacity') {
      setFormdata(prev => ({
        ...prev,
        capacity: value,
        price: accommodation.price * value,  // Update price when capacity changes
      }));
    }
    else
    {
      setFormdata(prev => ({ ...prev, [name]: value }));
    }
  };

  if (!accommodation || !bookingDate) {
    return <p className="text-center text-red-500 mt-10">Invalid booking details. Please select an accommodation first.</p>;
  }


  const handleSubmit = async (e) => {
    
    const { date, capacity, price } = formdata;
    if (!capacity || !date) {
      setError('Please fill in all required fields.');
      return;
    }
    if (capacity <= 0) {
      setError('Capacity must be greater than 0.');
      return;
    }
    if (capacity > accommodation.capacity) {
      setError('Capacity exceeds available accommodation capacity.');
      return;
    }
    setError(''); 
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log("Sending the Request with the following data: ", { accommodation_id: formdata.accid, booking_date: date});
      const res = await axios.post(
        'http://localhost:3000/accommodations/book',
        { 
          
          accommodation_id: formdata.accid,
          booking_date: formdata.date
        
        },
        { headers: { Authorization: `${token}` } }
      );
      console.log("The response is: ", res.data);
      const { payment_id } = res.data;
      toast.success('Booking successful ');
      navigate(`/accommodations`);
    } catch (err) {
      console.log('THe error is: ', err.response?.data?.error);
      toast.error(err.response?.data?.error || 'Booking failed.');
    }
  };

  return (
    <div>

      
      <div className="min-h-screen flex items-center justify-center bg-slate-800 text-white">
      <AnimatedForm>
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-500 capitalize ">Confirm Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div> */}
          
            <InputBox
                type= 'date'
                bname='date'
                bvalue={formdata.date}
                req = {true}
              />

              <InputBox
                type= 'number'
                bname='id'
                bvalue={formdata.accid}
                req = {true}
              />

              <InputBox
                type= 'number'
                bname='capacity'
                bvalue=  {formdata.capacity} 
                change={handleChange}  
                placeholder={ "Enter Number of Required Accupants"}           
              />
              <InputBox
                type= 'number'
                bname='price'
                bvalue={accommodation['price'] * formdata.capacity}
                change={handleChange}
                req = {true}
              />

          <LoginButton text = {"Proceed to Payment"} btype = {"Submit"} />
        </form>
      </AnimatedForm>
      </div>
    </div>
  );
};

export default BookingForm;
