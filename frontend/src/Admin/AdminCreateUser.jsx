import React, { useState } from 'react';
import LoginButton from '../Global Components/LoginButton';
import InputBox from '../Global Components/InputBox';

const AdminCreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'judge', // default to judge
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual backend logic
    console.log("New User Created:", formData);
    alert(`User of type "${formData.userType}" created!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[380px] text-center">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Create New User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-left"> 
          <InputBox type = 'text' bname = 'name' bvalue={formData.value} change = {handleChange} placeholder = "Your Name"/>
          <InputBox type= 'email' bname = 'email' bvalue={formData.email} change={handleChange} placeholder = 'Email'/>
          <InputBox type= 'password' bname = 'password' bvalue={formData.password} change={handleChange} placeholder = 'Your Password'/>
          <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full p-2 rounded-md text-black placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
              <option value="judge">Judge</option>
              <option value="admin">Admin</option>
          </select>

          <LoginButton btype = 'submit' text = 'Create User'/>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateUser;
