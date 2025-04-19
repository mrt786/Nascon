import React, { useState, useEffect} from 'react';
import InputBox from '../Global Components/InputBox';
import AuthToggle from '../Global Components/AuthToogle';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import RoleSelector from '../Global Components/RoleSelection';
import LoginButton from '../Global Components/LoginButton';



const ParticipantAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  // Sync state with the URL
  useEffect(() => {
    if (location.pathname.includes('signup')) {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === 'login' ? '/participant-login' : '/participant-signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 text-white">
      <div className="bg-slate-900 rounded-2xl shadow-xl p-8 w-[350px] text-center">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">{activeTab === 'login' ? 'Participant Login Form' : 'Participant Signup Form'}</h2>
        <AuthToggle activeTab={activeTab} setActiveTab={setActiveTab} tabname= {'participant'} />
        <form className="space-y-3">
          <RoleSelector/>
          <InputBox type="email" placeholder="Email Address" />
          <InputBox type="password" placeholder="Password" />
          {activeTab === 'signup' && <InputBox type="text" placeholder="Full Name" />}
          {activeTab === 'login' && (
            <div className="text-right text-sm">
              <Link to="#" className="text-blue-700 focus:outline-none focus:ring-2 focus:ring-pink-500">Forgot password?</Link>
            </div>
          )}
          <LoginButton text = {activeTab === 'login' ? 'Login' : 'Signup'} type={ "submit"} btype = { "submit"} />
        </form>

        <div className="mt-4 text-sm text-slate-600">
          {activeTab === 'login' ? (
            <>Not a member? <span onClick={() => handleTabChange('signup')} className="text-blue-700 cursor-pointer">Signup now</span></>
          ) : (
            <>Already have an account? <span onClick={() => handleTabChange('login')} className="text-blue-700 cursor-pointer">Login</span></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantAuth