import React from 'react';
import AnimatedRoutes from "./Animations/AnimatedRoutes.jsx";
import Navbar from './Global Components/Navbar.jsx';
import { getUserRole } from './utils/auth.js';
import { useLocation } from 'react-router-dom';
export default function App() {
  const userRole = getUserRole();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/participant-login' || location.pathname === '/participant-signup';
  return (
    <>
      {!isLoginPage  && <Navbar role  ={userRole} />}
      <AnimatedRoutes />
    </>

  );
}
