import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ParticipantAuth from './Participant/ParticipantLogin.jsx';
import JudgeLogin from './Judge/JudgeLogin.jsx';
import AdminAuth from './Admin/AdminLogin.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/participant-login" element={<ParticipantAuth />} />
        <Route path="/participant-signup" element={<ParticipantAuth />} />
        <Route path="/admin-login" element={<AdminAuth />} />
        <Route path="/admin-signup" element={<AdminAuth />} />
        <Route path="/judge" element={<JudgeLogin />} />
      </Routes>
    </Router>
  );
}
