import React from 'react';
import AnimatedRoutes from "./Animations/AnimatedRoutes.jsx";
import Navbar from './Global Components/Navbar.jsx';
import { getUserRole } from './utils/auth.js';
import { useLocation } from 'react-router-dom';
import ToastProvider from './Animations/ToastProvider.jsx';
import PageWrapper from './Animations/PageFadeIn.jsx';
export default function App() {
  const userRole = getUserRole();
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin-login' || location.pathname === '/sponsor-login' || location.pathname === '/judge-login' || location.pathname === '/event_organizer-login' || location.pathname === '/signup' || location.pathname === '/participant-login' || location.pathname === '/participant-signup';
  return (
  
    <PageWrapper>
      {!isLoginPage  && <Navbar role  ={userRole} />}
      <ToastProvider/>
      <AnimatedRoutes />
    </PageWrapper>

  );
}
