import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthToggle = ({ activeTab, setActiveTab, tabname }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname.includes('signup')) {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }, [location.pathname]);
  const handleToggle = (tab) => {
    navigate(`/${tabname}-${tab}`)
  };

  return (
    <div className="flex mb-6">
      <button
        className={`flex-1 py-2 ${activeTab === 'login' ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' : 'text-black'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
        onClick={() => handleToggle('login')}
      >
        Login
      </button>
      <button
        className={`flex-1 py-2 ${activeTab === 'signup' ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' : 'text-black'} rounded-r-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
        onClick={() => handleToggle('signup')}
      >
        Signup
      </button>
    </div>
  );
};

export default AuthToggle;
