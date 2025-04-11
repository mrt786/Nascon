import React from 'react';
import InputBox from '../Global Components/InputBox';
import RoleSelector from '../RoleSelection';
import { Link } from 'react-router-dom';
import LoginButton from '../Global Components/LoginButton.jsx';

const JudgeLogin = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-[350px] text-center">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Judge Login</h2>
      <form className="space-y-3">
        <RoleSelector/>
        <InputBox type="email" placeholder="Email" />
        <InputBox type="password" placeholder="Password" />
        <div className="text-right text-sm">
              <Link to="#" className="text-blue-700">Forgot password?</Link>
        </div>
        <LoginButton/>
      </form>
    </div>
  </div>
);
export default JudgeLogin