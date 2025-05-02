import React, { useState } from 'react';
import InputBox from './InputBox';
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';
import RoleSelector from './RoleSelection';
import axios from 'axios';
import PageWrapper from '../Animations/PageFadeIn';

const Login = ({ role }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPopup, setErrorPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const handlePasswordToggle = () => {
    setShowPassword(prevState => !prevState); // Toggle the state of password visibility
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      const  token  = response.data.token;
      localStorage.setItem('token', token); // Save token for authentication

      alert('Login successful!');
      navigate('/home'); // change the route to home
    } catch (error) 
    {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorPopup(error.response.data.error);
      } else {
        setErrorPopup('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-slate-800 text-white">
      <div className="bg-slate-900 rounded-2xl shadow-xl p-8 w-[350px] text-center relative">
        <h2 className="text-2xl font-bold mb-4 text-orange-500 capitalize">
          {role} Login Form
        </h2>

        <form onSubmit={handleLogin} className="space-y-3">
        
          <RoleSelector/>
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
          <div className="text-right text-sm">
            <a href="#" className="text-blue-700 focus:outline-none focus:ring-2 focus:ring-pink-500">Forgot password?</a>
          </div>

          <LoginButton text = {"Login"} btype = {"Submit"} />
        </form>

        {/* Error Popup */}
        {errorPopup && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-4 py-2 rounded-md shadow-md">
            Invalid email or password
          </div>
        )}
      </div>
    </div>
    </PageWrapper>
  );
};

export default Login;
