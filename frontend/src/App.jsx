import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ParticipantAuth from './Participant/ParticipantLogin.jsx';
import Login from './Global Components/Login.jsx';
import AdminCreateUser from './Admin/AdminCreateUser.jsx';
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
      </Routes>
    </Router>
  );
}
