import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import WholePageWrapper from './PageWrapper.jsx';
import ParticipantAuth from '../Participant/ParticipantLogin.jsx';
import Login from '../Global Components/Login.jsx';
import AdminCreateUser from '../Admin/AdminCreateUser.jsx';
import AccommodationPage from '../Global Components/Accommodation.jsx';
import HomePage from '../Global Components/Home.jsx';
import BookingForm from '../Global Components/BookingForm.jsx';
import OrganizeEvent from '../Event Organizor/OrganizeEvent.jsx';
import PendingEventsPage from '../Admin/PendingEvents.jsx';
import SponsorEventPage from '../Sponsors/SponsorEventPage.jsx';
import ApprovedEventsPage from '../Global Components/Events.jsx';
import SponsorPaymentsPage from '../Sponsors/SponsorPaymentPage.jsx';
import ApprovedEventsByOrganizor from '../Event Organizor/ApprovedEventsByOrganizor.jsx';
import ParticipantRegisterForm from '../Participant/ParticipantRegisterForm.jsx';
import ParticipantPaymentForm from '../Participant/ParticipantPayment.jsx';
import JudgeAssignedEvents from '../Judge/JudgeAssignedEvent.jsx';
import AssignToEventForm from '../Judge/JudgeAssignToEventForm.jsx';
import SubmitScoreForm from '../Judge/SubmitScoreForm.jsx';

// AnimatedRoutes handles the AnimatePresence and location keying
function AnimatedRoutes() {
  const location = useLocation();
  console.log(location.pathname); // Log the current pathname for debugging

  return (
    <AnimatePresence mode="wait">
      <Routes  key={location.pathname}>

        <Route
          path="/participant-login"
          element={
            <WholePageWrapper>
              <ParticipantAuth />
            </WholePageWrapper>
          }
        />
        <Route
          path="/participant-signup"
          element={
            <WholePageWrapper>
              <ParticipantAuth />
            </WholePageWrapper>
          }
        />
        <Route
          path="/admin-login"
          element={
            <WholePageWrapper>
              <Login role="admin" />
            </WholePageWrapper>
          }
        />
        <Route
          path="/judge-login"
          element={
            <WholePageWrapper>
              <Login role="judge" />
            </WholePageWrapper>
          }
        />
        <Route
          path="/sponsor-login"
          element={
            <WholePageWrapper>
              <Login role="sponsor" />
            </WholePageWrapper>
          }
        />
        <Route
          path="/event_organizer-login"
          element={
            <WholePageWrapper>
              <Login role="Event Organizer" />
            </WholePageWrapper>
          }
        />
        <Route
          path="/organize-events"
          element={
            <WholePageWrapper>
              <OrganizeEvent />
            </WholePageWrapper>
          }
        />
        <Route
          path="/approve-events"
          element={
            <WholePageWrapper>
              <PendingEventsPage />
            </WholePageWrapper>
          }
        />
        <Route
          path="/create-user"
          element={
            <WholePageWrapper>
              <AdminCreateUser />
            </WholePageWrapper>
          }
        />
        <Route
          path="/accommodations"
          element={
            <WholePageWrapper>
              <AccommodationPage />
            </WholePageWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <WholePageWrapper>
              <HomePage roles="participant" />
            </WholePageWrapper>
          }
        />
        <Route
          path="/booking"
          element={
            <WholePageWrapper>
              <BookingForm />
            </WholePageWrapper>
          }
        />
        <Route
          path="/"
          element={
            <WholePageWrapper>
              <Login role="participant" />
            </WholePageWrapper>
          }
        />
        <Route
          path="/events"
          element={
            <WholePageWrapper>
              <ApprovedEventsPage />
            </WholePageWrapper>
          }
        />
        <Route
          path="/sponsor-events"
          element={
            <WholePageWrapper>
              <SponsorEventPage />
            </WholePageWrapper>
          }
        />
        <Route
          path="/sponsor/payments"
          element={
            <WholePageWrapper>
              <SponsorPaymentsPage />
            </WholePageWrapper>
          }
        />
        <Route
          path="/event-organizer/approved-events"
          element={
            <WholePageWrapper>
              <ApprovedEventsByOrganizor />
            </WholePageWrapper>
          }
        />
        <Route
          path="/participant/register/:eventId"
          element={
            <WholePageWrapper>
              <ParticipantRegisterForm />
            </WholePageWrapper>
          }
        />
        <Route
          path="/participant/payment/:eventId"
          element={
            <WholePageWrapper>
              <ParticipantPaymentForm />
            </WholePageWrapper>
          }
        />
        <Route
          path="/judge/my-events"
          element={
            <WholePageWrapper>
              <JudgeAssignedEvents />
            </WholePageWrapper>
          }
        />
        <Route
          path="/judge/assign-event"
          element={
            <WholePageWrapper>
              <AssignToEventForm />
            </WholePageWrapper>
          }
        />
        <Route
          path="/judge/submit-score/:eventId"
          element={
            <WholePageWrapper>
              <SubmitScoreForm />
            </WholePageWrapper>
          }
        />
        <Route
          path="*"
          element={
            <WholePageWrapper>
              <p>Page not found</p>
            </WholePageWrapper>
          }
        />
      
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;