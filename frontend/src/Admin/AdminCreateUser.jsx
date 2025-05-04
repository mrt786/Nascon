import React, { useState } from 'react';
import LoginButton from '../Global Components/LoginButton';
import InputBox from '../Global Components/InputBox';
import { validatePassword } from '../utils/auth';
import { validatePhone } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const AdminCreateUser = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    password: '',
    userType: 'judge', // default to judge

  });
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const handlePasswordToggle = () => {
    setShowPassword(prevState => !prevState); // Toggle the state of password visibility
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit= async (e) => {
    e.preventDefault();
    setValidationError('');
    try{
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation['valid']) {
        setValidationError(passwordValidation['message']);
        return;
      }
      const phoneValidation = validatePhone(formData.phonenumber);
      if (!phoneValidation['valid']) {
        setValidationError(phoneValidation['message']);
        return; 
      }
      console.log("THe data present in the form is: ",formData)
      const response = await axios.post('http://localhost:3000/auth/signup', {
        fname: formData.firstname,
        lname: formData.lastname,
        contact_no: formData.phonenumber,
        role: formData.userType, // or get this dynamically if you have role selection
        email:formData.email,
        password:formData.password,
      });
      toast.success(`${formData.userType} created successfully!`)
      console.log(response.data);
      window.location.reload(); // Reload the page to reflect the new state
    
    } 
    catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setValidationError(error.response.data.error);
      } else {
        setValidationError('Something went wrong. Please try again.');
      }
    }
    const checkrole = () =>{
      const role = getUserRole(); // Assuming you have a function to get the user role
      if (role === 'admin')
      {
        return true;
      } 
      else{
        return false;
      }
    };
  };

  return (
    <div >
      <div className="min-h-screen flex items-center justify-center bg-slate-800 text-white">
      <div className="bg-slate-900 rounded-2xl shadow-xl p-8 w-[380px] text-center">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">Create New User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-left"> 
          <InputBox type = 'text' bname = 'firstname' bvalue={formData.firstname} change = {handleChange} placeholder = "First Name"/>
          <InputBox type = 'text' bname = 'lastname' bvalue={formData.lastname} change = {handleChange} placeholder = "Last Name"/>
          <InputBox type = 'number' bname = 'phonenumber' bvalue={formData.phonenumber} change={handleChange} placeholder = 'Phone Number'/>
          <InputBox type= 'email' bname = 'email' bvalue={formData.email} change={handleChange} placeholder = 'Email'/>
          <div className="relative">
              <InputBox
                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                bname='password'
                bvalue={formData.password}
                change={handleChange}
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
                <motion.select
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileFocus={{ scale: 1.02, borderColor: "#D4A6A1", boxShadow: "0 0 8px #D4A6A1" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onChange={handleChange}
                  name="userType"
                  value={formData.userType}
                  defaultValue=""
                  className="w-full p-2 rounded-md text-black placeholder-slate-400  focus:outline-none focus:ring-2"
                >
                  <option value="judge">Judge</option>
                  <option value="sponsor">Sponsor</option>
                  <option value="event_organizer">Event Organizer</option>
                </motion.select>
          
          {validationError && <p className="text-red-500 text-sm">{validationError}</p>}
          <LoginButton btype = 'submit' text = 'Create User'/>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AdminCreateUser;
