import React, { useState, useEffect } from 'react';
import InputBox from '../Global Components/InputBox';
import AuthToggle from '../Global Components/AuthToogle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RoleSelector from '../Global Components/RoleSelection';
import LoginButton from '../Global Components/LoginButton';
import axios from 'axios';

const ParticipantAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

// Phone: must be 11 digits, start with "03", all numeric
const validatePhone = (phone) => {
  if (phone.length !== 11) return false;
  if (!phone.startsWith('03')) return false;
  // ensure every character is a digit
  return [...phone].every(ch => ch >= '0' && ch <= '9');
};

// Password: at least 8 chars, and one of each: lowercase, uppercase, digit, special
const validatePassword = (password) => {


  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;
  let hasSpecial = false;

  const specialCharacters = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~";

  for (const ch of password) {
    if (ch >= 'a' && ch <= 'z') hasLower = true;
    else if (ch >= 'A' && ch <= 'Z') hasUpper = true;
    else if (ch >= '0' && ch <= '9') hasDigit = true;
    else if (specialCharacters.includes(ch)) hasSpecial = true;

  }

  return hasLower && hasUpper && hasDigit && hasSpecial;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setValidationError('');

  try {
    if (activeTab === 'signup') {
      if (!validatePassword(password)) {
        setValidationError(
          'Password must be ≥8 chars, include uppercase, lowercase & a special character.'
        );
        return;
      }
      if (!validatePhone(phoneNumber)) {
        setValidationError('Phone number must be 11 digits and start with 03.');
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

      console.log(response.data);
      const { token } = response.data;
      localStorage.setItem('token', token); // Save token for authentication

      alert('Login successful!');
      navigate('/create-user'); // change the route to home
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.error) {
      setValidationError(error.response.data.error);
    } else {
      setValidationError('Something went wrong. Please try again.');
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[350px] text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">
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
          <InputBox
            type="password"
            placeholder="Password"
            value={password}
            change ={(e) => setPassword(e.target.value)}
          />

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
      </div>
    </div>
  );
};

export default ParticipantAuth;

