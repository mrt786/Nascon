import React, { useState } from 'react';
import InputBox from './InputBox';
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';
import RoleSelector from './RoleSelection';

const Login = ({ role }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPopup, setErrorPopup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://your-backend-url.com/${role}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        navigate(`/${role}-home`);
      } else {
        setErrorPopup(true);
        setTimeout(() => setErrorPopup(false), 3000); // Auto-hide after 3 sec
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorPopup(true);
      setTimeout(() => setErrorPopup(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[350px] text-center relative">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 capitalize">
          {role} Login Form
        </h2>

        <form onSubmit={handleLogin} className="space-y-3">
        
          <RoleSelector/>
          <InputBox
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
  );
};

export default Login;
