import React, { useImperativeHandle } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import WholePageWrapper from './PageWrapper.jsx';
import ParticipantAuth from '../Participant/ParticipantLogin.jsx';
import Login from '../Global Components/Login.jsx';
import AdminCreateUser from '../Admin/AdminCreateUser.jsx';
import AccommodationPage from '../Global Components/Accommodation.jsx';
import HomePage from '../Global Components/Home.jsx';
import BookingForm from '../Global Components/BookingForm.jsx';
import OrganizeEvent from '../Event Organizer/OrganizeEvent.jsx';
import PendingEventsPage from '../Admin/PendingEvents.jsx';
import SponsorEventPage from '../Sponsors/SponsorEventPage.jsx';
import ApprovedEventsPage from '../Global Components/Events.jsx';
import SponsorPaymentsPage from '../Sponsors/SponsorPaymentPage.jsx';
import ApprovedEventsByOrganizor from '../Event Organizer/ApprovedEventsByOrganizor.jsx';
import ParticipantRegisterForm from '../Participant/ParticipantRegisterForm.jsx';
import ParticipantPaymentForm from '../Participant/ParticipantPayment.jsx';
import JudgeAssignedEvents from '../Judge/JudgeAssignedEvent.jsx';
import AssignToEventForm from '../Judge/JudgeAssignToEventForm.jsx';
import { toast } from 'sonner';
import ParticipatedEvents from '../Participant/ParticipatedEvents.jsx';
import SponsoredEventsPage from '../Sponsors/Sponsored.jsx';
import SubmitScoreForm from '../Judge/SubmitScoreForm.jsx';
import JudgingEventsPage from '../Judge/JudgeEvents.jsx';
import AddSponsorshipPackages from '../Event Organizer/AddSponsorshipPackage.jsx';

// Helper function to check authentication and role
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const userRole = localStorage.getItem('role'); // Get the role from localStorage

  // If no token or the role doesn't match, redirect to the login page
  console.log(userRole , allowedRole);
  if (!token || userRole !== allowedRole) {
    toast.error('You are not authorized to access this page. Please log in.');
    return <Navigate to={`/${userRole ? `${userRole}-login` : 'participant-login'}`} replace />;
  }
  
  return children; // Render the protected component if authenticated
};

// AnimatedRoutes handles the AnimatePresence and location keying
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname}>
        {/* Public Routes */}
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
          path="/judge-home"
          element={
            <ProtectedRoute allowedRole="judge">
              <WholePageWrapper>
                <HomePage roles="judge" />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/judge/my-events"
          element={
            <ProtectedRoute allowedRole="judge">
              <WholePageWrapper>
                <JudgingEventsPage/>
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
                <Route
          path="/judge/evaluate-events"
          element={
            <ProtectedRoute allowedRole="judge">
              <WholePageWrapper>
                <JudgeAssignedEvents />
              </WholePageWrapper>
            </ProtectedRoute>
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
              <Login role="event_organizer" />
            </WholePageWrapper>
          }
        />
                <Route
          path="/event_organizer-home"
          element={
            <ProtectedRoute allowedRole="event_organizer">
              <WholePageWrapper>
                <HomePage roles="event_organizer" />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
                <Route
          path="/organize-events"
          element={
            <ProtectedRoute allowedRole="event_organizer">
              <WholePageWrapper>
                <OrganizeEvent />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/event-organizer/approved-events"
          element={
            <ProtectedRoute allowedRole="event_organizer">
              <WholePageWrapper>
                <ApprovedEventsByOrganizor />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-sponsorships-packages"
          element={
            <ProtectedRoute allowedRole="event_organizer">
              <WholePageWrapper>
                <AddSponsorshipPackages />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        {/* Protected Routes */}
        <Route
          path="/participant-home"
          element={
            <ProtectedRoute allowedRole="participant">
              <WholePageWrapper>
                <HomePage roles="participant" />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsor-home"
          element={
            <ProtectedRoute allowedRole="sponsor">
              <WholePageWrapper>
                <HomePage roles="sponsor" />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-home"
          element={
            <ProtectedRoute allowedRole="admin">
              <WholePageWrapper>
                <HomePage roles="admin" />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />


        <Route
          path="/approve-events"
          element={
            <ProtectedRoute allowedRole="admin">
              <WholePageWrapper>
                <PendingEventsPage />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-user"
          element={
            <ProtectedRoute allowedRole="admin">
              <WholePageWrapper>
                <AdminCreateUser />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/accommodations"
          element={
            <ProtectedRoute allowedRole="participant">
              <WholePageWrapper>
                <AccommodationPage />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute allowedRole="participant">
              <WholePageWrapper>
                <ApprovedEventsPage />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <ProtectedRoute allowedRole="admin">
              <WholePageWrapper>
                <ApprovedEventsPage />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <ProtectedRoute allowedRole="participant">
              <WholePageWrapper>
                <ParticipatedEvents />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsor-events"
          element={
            <ProtectedRoute allowedRole="sponsor">
              <WholePageWrapper>
                <SponsorEventPage />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsor/payments"
          element={
            <ProtectedRoute allowedRole="sponsor">
              <WholePageWrapper>
                <SponsorPaymentsPage />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsor/approved-events"
          element={
            <ProtectedRoute allowedRole="sponsor">
              <WholePageWrapper>
                <SponsoredEventsPage/>
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/participant/register/:eventId"
          element={
            <ProtectedRoute allowedRole="participant">
              <WholePageWrapper>
                <ParticipantRegisterForm />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/participant/payment/:eventId"
          element={
            <ProtectedRoute allowedRole="participant">
              <WholePageWrapper>
                <ParticipantPaymentForm />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute allowedRole="participant">
              <WholePageWrapper>
                <BookingForm />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/judge/assign-event"
          element={
            <ProtectedRoute allowedRole="judge">
              <WholePageWrapper>
                <AssignToEventForm />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/judge/submit-score/:eventId"
          element={
            <ProtectedRoute allowedRole="judge">
              <WholePageWrapper>
                <SubmitScoreForm />
              </WholePageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
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

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';
// import WholePageWrapper from './PageWrapper.jsx';
// import ParticipantAuth from '../Participant/ParticipantLogin.jsx';
// import Login from '../Global Components/Login.jsx';
// import AdminCreateUser from '../Admin/AdminCreateUser.jsx';
// import AccommodationPage from '../Global Components/Accommodation.jsx';
// import HomePage from '../Global Components/Home.jsx';
// import BookingForm from '../Global Components/BookingForm.jsx';
// import OrganizeEvent from '../Event Organizor/OrganizeEvent.jsx';
// import PendingEventsPage from '../Admin/PendingEvents.jsx';
// import SponsorEventPage from '../Sponsors/SponsorEventPage.jsx';
// import ApprovedEventsPage from '../Global Components/Events.jsx';
// import SponsorPaymentsPage from '../Sponsors/SponsorPaymentPage.jsx';
// import ApprovedEventsByOrganizor from '../Event Organizor/ApprovedEventsByOrganizor.jsx';
// import ParticipantRegisterForm from '../Participant/ParticipantRegisterForm.jsx';
// import ParticipantPaymentForm from '../Participant/ParticipantPayment.jsx';
// import JudgeAssignedEvents from '../Judge/JudgeAssignedEvent.jsx';
// import AssignToEventForm from '../Judge/JudgeAssignToEventForm.jsx';
// import SubmitScoreForm from '../Judge/SubmitScoreForm.jsx';

// // AnimatedRoutes handles the AnimatePresence and location keying
// function AnimatedRoutes() {
//   const location = useLocation();
//   console.log(location.pathname); // Log the current pathname for debugging

//   return (
//     <AnimatePresence mode="wait">
//       <Routes  key={location.pathname}>

//         <Route
//           path="/participant-login"
//           element={
//             <WholePageWrapper>
//               <ParticipantAuth />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/participant-signup"
//           element={
//             <WholePageWrapper>
//               <ParticipantAuth />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/admin-login"
//           element={
//             <WholePageWrapper>
//               <Login role="admin" />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/judge-login"
//           element={
//             <WholePageWrapper>
//               <Login role="judge" />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/sponsor-login"
//           element={
//             <WholePageWrapper>
//               <Login role="sponsor" />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/event_organizer-login"
//           element={
//             <WholePageWrapper>
//               <Login role="Event Organizer" />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/organize-events"
//           element={
//             <WholePageWrapper>
//               <OrganizeEvent />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/approve-events"
//           element={
//             <WholePageWrapper>
//               <PendingEventsPage />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/create-user"
//           element={
//             <WholePageWrapper>
//               <AdminCreateUser />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/accommodations"
//           element={
//             <WholePageWrapper>
//               <AccommodationPage />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/home"
//           element={
//             <WholePageWrapper>
//               <HomePage roles="participant" />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/booking"
//           element={
//             <WholePageWrapper>
//               <BookingForm />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/"
//           element={
//             <WholePageWrapper>
//               <Login role="participant" />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/events"
//           element={
//             <WholePageWrapper>
//               <ApprovedEventsPage />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/sponsor-events"
//           element={
//             <WholePageWrapper>
//               <SponsorEventPage />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/sponsor/payments"
//           element={
//             <WholePageWrapper>
//               <SponsorPaymentsPage />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/event-organizer/approved-events"
//           element={
//             <WholePageWrapper>
//               <ApprovedEventsByOrganizor />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/participant/register/:eventId"
//           element={
//             <WholePageWrapper>
//               <ParticipantRegisterForm />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/participant/payment/:eventId"
//           element={
//             <WholePageWrapper>
//               <ParticipantPaymentForm />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/judge/my-events"
//           element={
//             <WholePageWrapper>
//               <JudgeAssignedEvents />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/judge/assign-event"
//           element={
//             <WholePageWrapper>
//               <AssignToEventForm />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/judge/submit-score/:eventId"
//           element={
//             <WholePageWrapper>
//               <SubmitScoreForm />
//             </WholePageWrapper>
//           }
//         />
//         <Route
//           path="*"
//           element={
//             <WholePageWrapper>
//               <p>Page not found</p>
//             </WholePageWrapper>
//           }
//         />
      
//       </Routes>
//     </AnimatePresence>
//   );
// }

// export default AnimatedRoutes;