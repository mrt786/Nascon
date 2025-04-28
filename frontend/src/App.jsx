import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ParticipantAuth from './Participant/ParticipantLogin.jsx';
import Login from './Global Components/Login.jsx';
import AdminCreateUser from './Admin/AdminCreateUser.jsx';
import AccommodationPage from './Global Components/Accommodation.jsx';
import HomePage from './Global Components/Home.jsx';
import BookingForm from './Global Components/BookingForm.jsx';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/participant-login" element={<ParticipantAuth />} />
        <Route path="/participant-signup" element={<ParticipantAuth />} />
        <Route path="/admin-login" element={<Login role={ "admin"} />} />
        <Route path="/judge-login" element={<Login role={ "judge"} />} />
        <Route path="/sponser-login" element={<Login role={ "sponser"}/> } />
        <Route path='/create-user' element = {<AdminCreateUser/> } />
        <Route path="/accommodations" element={<AccommodationPage  />} />
        <Route path='/home'  element = {<HomePage roles = {'participant'}/>}/>
        <Route path = '/booking' element = {<BookingForm/>}/> 
        <Route path="/" element={<Login role={ "participant"} />} />

      </Routes>
    </Router>
  );
}
