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
import ViewEventDetails from '../Event Organizer/ViewEventDetails.jsx';
import ViewSponsorAmount from '../Event Organizer/ViewSponsorAmount.jsx';
import SponsorIncomeReport from '../Event Organizer/SponsorIncomeReport.jsx';
import VenueUtilizationReport from '../Admin/VenueReport.jsx';
import FinanceReport from '../Admin/FinanceReport.jsx';
import ParticipantDemographicsReport from '../Admin/ParticipantDemographicReport.jsx';

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
              <ParticipantAuth />
          }
        />
        <Route
          path="/participant-signup"
          element={
              <ParticipantAuth />
          }
        />
        <Route
          path="/admin-login"
          element={
              <Login role="admin" />
          }
        />
        <Route
          path="/judge-login"
          element={
              <Login role="judge" />
          }
        />
        <Route
          path="/judge-home"
          element={
            <ProtectedRoute allowedRole="judge">

                <HomePage roles="judge" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/judge/my-events"
          element={
            <ProtectedRoute allowedRole="judge">

                <JudgingEventsPage/>
            </ProtectedRoute>
          }
        />
                <Route
          path="/judge/evaluate-events"
          element={
            <ProtectedRoute allowedRole="judge">

                <JudgeAssignedEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsor-login"
          element={
              <Login role="sponsor" />
          }
        />
        <Route
          path="/event_organizer-login"
          element={
              <Login role="event_organizer" />
          }
        />
                <Route
          path="/event_organizer-home"
          element={
            <ProtectedRoute allowedRole="event_organizer">

                <HomePage roles="event_organizer" />
            </ProtectedRoute>
          }
        />
                <Route
          path="/organize-events"
          element={
            <ProtectedRoute allowedRole="event_organizer">

                <OrganizeEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event-organizer/approved-events"
          element={
            <ProtectedRoute allowedRole="event_organizer">

                <ApprovedEventsByOrganizor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-sponsorships-packages"
          element={
            <ProtectedRoute allowedRole="event_organizer">

                <AddSponsorshipPackages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-event-details"
          element={
            <ProtectedRoute allowedRole="event_organizer">

                <ViewEventDetails />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/organizer/sponsor-amount"
          element={
            <ProtectedRoute allowedRole="event_organizer">

                <ViewSponsorAmount/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/sponsor-income-report"
          element={
            <ProtectedRoute allowedRole="event_organizer">

                <SponsorIncomeReport/>
            </ProtectedRoute>
          }
        />


        {/* Protected Routes */}
        <Route
          path="/participant-home"
          element={
            <ProtectedRoute allowedRole="participant">

                <HomePage roles="participant" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsor-home"
          element={
            <ProtectedRoute allowedRole="sponsor">

                <HomePage roles="sponsor" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-home"
          element={
            <ProtectedRoute allowedRole="admin">

                <HomePage roles="admin" />
            </ProtectedRoute>
          }
        />


        <Route
          path="/approve-events"
          element={
            <ProtectedRoute allowedRole="admin">

                <PendingEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-user"
          element={
            <ProtectedRoute allowedRole="admin">

                <AdminCreateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/venue-report"
          element={
            <ProtectedRoute allowedRole="admin">

                <VenueUtilizationReport/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance-report"
          element={
            <ProtectedRoute allowedRole="admin">

                <FinanceReport/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/demographic-report"
          element={
            <ProtectedRoute allowedRole="admin">

                <ParticipantDemographicsReport/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/accommodations"
          element={
            <ProtectedRoute allowedRole="participant">

                <AccommodationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute allowedRole="participant">

                <ApprovedEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <ProtectedRoute allowedRole="admin">

                <ApprovedEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <ProtectedRoute allowedRole="participant">

                <ParticipatedEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsor-events"
          element={
            <ProtectedRoute allowedRole="sponsor">

                <SponsorEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsor/payments"
          element={
            <ProtectedRoute allowedRole="sponsor">

                <SponsorPaymentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsor/approved-events"
          element={
            <ProtectedRoute allowedRole="sponsor">

                <SponsoredEventsPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/participant/register/:eventId"
          element={
            <ProtectedRoute allowedRole="participant">

                <ParticipantRegisterForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/participant/payment/:eventId"
          element={
            <ProtectedRoute allowedRole="participant">

                <ParticipantPaymentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute allowedRole="participant">

                <BookingForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/judge/assign-event"
          element={
            <ProtectedRoute allowedRole="judge">

                <AssignToEventForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/judge/submit-score/:eventId"
          element={
            <ProtectedRoute allowedRole="judge">

                <SubmitScoreForm />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route
          path="*"
          element={
              <p>Page not found</p>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;


// function AnimatedRoutes() {
//   const location = useLocation();
//   console.log(location.pathname); // Log the current pathname for debugging

//   return (
//     <AnimatePresence mode="wait">
//       <Routes  key={location.pathname}>

//         <Route
//           path="/participant-login"
//           element={
//         
//               <ParticipantAuth />
//             // </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/participant-signup"
//           element={
//         
//               <ParticipantAuth />
//             // </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/admin-login"
//           element={
//         
//               <Login role="admin" />
//             // </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/judge-login"
//           element={
//         
//               <Login role="judge" />
//             // </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/sponsor-login"
//           element={
//         
//               <Login role="sponsor" />
//             // </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/event_organizer-login"
//           element={
//         
//               <Login role="Event Organizer" />
//             // </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/organize-events"
//           element={
//         
//               <OrganizeEvent />
//             // </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/approve-events"
//           element={
//         
//               <PendingEventsPage />
//             // </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/create-user"
//           element={
//         
//               <AdminCreateUser />
//             // </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/accommodations"
//           element={
//         
//               <AccommodationPage />
//             // </WholePageWrapper>
//           }
//         />
//         <Route
//           path="/home"
//           element={
//      
//               <HomePage roles="participant" />
//
//           }
//         />
//         <Route
//           path="/booking"
//           element={
//      
//               <BookingForm />
//
//           }
//         />
//         <Route
//           path="/"
//           element={
//      
//               <Login role="participant" />
//
//           }
//         />
//         <Route
//           path="/events"
//           element={
//      
//               <ApprovedEventsPage />
//
//           }
//         />
//         <Route
//           path="/sponsor-events"
//           element={
//      
//               <SponsorEventPage />
//
//           }
//         />
//         <Route
//           path="/sponsor/payments"
//           element={
//      
//               <SponsorPaymentsPage />
//
//           }
//         />
//         <Route
//           path="/event-organizer/approved-events"
//           element={
//      
//               <ApprovedEventsByOrganizor />
//
//           }
//         />
//         <Route
//           path="/participant/register/:eventId"
//           element={
//      
//               <ParticipantRegisterForm />
//
//           }
//         />
//         <Route
//           path="/participant/payment/:eventId"
//           element={
//      
//               <ParticipantPaymentForm />
//
//           }
//         />
//         <Route
//           path="/judge/my-events"
//           element={
//      
//               <JudgeAssignedEvents />
//
//           }
//         />
//         <Route
//           path="/judge/assign-event"
//           element={
//      
//               <AssignToEventForm />
//
//           }
//         />
//         <Route
//           path="/judge/submit-score/:eventId"
//           element={
//      
//               <SubmitScoreForm />
//
//           }
//         />
//         <Route
//           path="*"
//           element={
//      
//               <p>Page not found</p>
//
//           }
//         />
      
//       </Routes>
//     </AnimatePresence>
//   );
// }

// export default AnimatedRoutes;