import React, { useState, useEffect } from 'react';
import InputBox from '../Global Components/InputBox';
import AuthToggle from '../Global Components/AuthToogle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RoleSelector from '../Global Components/RoleSelection';
import LoginButton from '../Global Components/LoginButton';
import axios from 'axios';
import { validatePassword } from '../utils/auth';
import { validatePhone } from '../utils/auth';


const ParticipantAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const handlePasswordToggle = () => {
    setShowPassword(prevState => !prevState); // Toggle the state of password visibility
  };
  
  const [activeTab, setActiveTab] = useState('login');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    setActiveTab(location.pathname.includes('signup') ? 'signup' : 'login');
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === 'login' ? '/participant-login' : '/participant-signup');
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  setValidationError('');

  try {
    if (activeTab === 'signup') {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation['valid']) {
        setValidationError(passwordValidation['message']);
        return;
      }
      const phoneValidation = validatePhone(phoneNumber);
      if (!phoneValidation['valid']) {
        setValidationError(phoneValidation['message']);
        return; 
      }

      // Call signup API
      const response = await axios.post('http://localhost:3000/auth/signup', {
        fname: firstName,
        lname: lastName,
        contact_no: phoneNumber,
        role: "participant", // or get this dynamically if you have role selection
        email,
        password,
      });

      console.log(response.data);
      alert('Signup successful! You can now log in.');
      navigate('/participant-login');
    } else {
      // Call login API
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const  token  = response.data.token;
      localStorage.setItem('token', token); // Save token for authentication

      alert('Login successful!');
      navigate('/home'); // change the route to home
    }
  } catch (error) 
  {
    console.error(error);
    if (error.response && error.response.data && error.response.data.error) {
      setValidationError(error.response.data.error);
    } else {
      setValidationError('Something went wrong. Please try again.');
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 text-white">
      <div className="bg-slate-900 rounded-2xl shadow-xl p-8 w-[350px] text-center">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">
          {activeTab === 'login'
            ? 'Participant Login Form'
            : 'Participant Signup Form'}
        </h2>
        <AuthToggle
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          tabname="participant"
        />

        <form onSubmit={handleSubmit} className="space-y-3">
         {activeTab === 'login' && ( <RoleSelector />)}

          {activeTab === 'signup' && (
            <>
              <InputBox
                type="text"
                placeholder="First Name"
                value={firstName}
                change ={(e) => setFirstName(e.target.value)}
              />
              <InputBox
                type="text"
                placeholder="Last Name"
                value={lastName}
                change ={(e) => setLastName(e.target.value)}
              />
              <InputBox
                type="number"
                placeholder="Phone Number"
                value={phoneNumber}
                change ={(e) => setPhoneNumber(e.target.value)}
              />
            </>
          )}

          <InputBox
            type="email"
            placeholder="Email Address"
            value={email}
            change ={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
              <InputBox
                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                bname='password'
                bvalue={password}
                change={(e) => setPassword(e.target.value)}
                placeholder='Your Password'
              />
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500"
              >
                {showPassword ? 'Hide' : 'Show'} {/* Button text */}
              </button>
            </div>

          {validationError && (
            <p className="text-red-600 text-sm text-left">
              {validationError}
            </p>
          )}

          {activeTab === 'login' && (
            <div className="text-right text-sm">
              <Link
                to="#"
                className="text-blue-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <LoginButton
            text={activeTab === 'login' ? 'Login' : 'Signup'}
            type="submit"
            btype="submit"
          />
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

export default ParticipantAuth;

