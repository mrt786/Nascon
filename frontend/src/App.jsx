import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ParticipantAuth from './Participant/ParticipantLogin.jsx';
import Login from './Global Components/Login.jsx';
import AdminCreateUser from './Admin/AdminCreateUser.jsx';
import AccommodationPage from './Global Components/Accommodation.jsx';
import HomePage from './Global Components/Home.jsx';
import BookingForm from './Global Components/BookingForm.jsx';
import OrganizeEvent from './Global Components/OrganizeEvent.jsx';
import PendingEventsPage from './Admin/PendingEvents.jsx';
import SponsorEventPage from './Sponsors/SponsorEventPage.jsx';
import ApprovedEventsPage from './Global Components/Events.jsx'
import SponsorPaymentsPage from './Sponsors/SponsorPaymentPage.jsx';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/participant-login" element={<ParticipantAuth />} />
        <Route path="/participant-signup" element={<ParticipantAuth />} />
        <Route path="/admin-login" element={<Login role={ "admin"} />} />
        <Route path="/judge-login" element={<Login role={ "judge"} />} />
        <Route path="/sponsor-login" element={<Login role={ "sponsor"}/> } />
        <Route path = "/event_organizer-login" element={<Login role={ "Event Organizer"} />} />
        <Route path = "/organize-events" element={<OrganizeEvent />} />
        <Route path = '/approve-events' element = {<PendingEventsPage />} />
        <Route path='/create-user' element = {<AdminCreateUser/> } />
        <Route path="/accommodations" element={<AccommodationPage  />} />
        <Route path='/home'  element = {<HomePage roles = {'participant'}/>}/>
        <Route path = '/booking' element = {<BookingForm/>}/> 
        <Route path="/" element={<Login role={ "participant"} />} />
        <Route path="/events" element={<ApprovedEventsPage/>} />
        <Route path = '/sponsor-events' element = {<SponsorEventPage/>} />
        <Route path="/sponsor/payments"       element={<SponsorPaymentsPage />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  )
};

