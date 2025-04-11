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
        className={`flex-1 py-2 ${activeTab === 'login' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-600'} rounded-l-md`}
        onClick={() => handleToggle('login')}
      >
        Login
      </button>
      <button
        className={`flex-1 py-2 ${activeTab === 'signup' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-600'} rounded-r-md`}
        onClick={() => handleToggle('signup')}
      >
        Signup
      </button>
    </div>
  );
};

export default AuthToggle;
