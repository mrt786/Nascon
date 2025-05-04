import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // Assuming imported
import SimpleButton from './SimpleButton';
import { useNavigate } from 'react-router-dom'; // Assuming imported

const navOptions = {
  admin: [
    { path: '/admin-home', label: 'Home' },
    { path: '/create-user', label: 'Create User' },
    { path: '/approve-events', label: 'Approve Events' },
    { path: '/admin-events', label: 'Events' },
    { path: '/accommodation-settings', label: 'Accommodations' },
  ],
  judge: [
    { path: '/judge-home', label: 'Home' },
    { path: '/judge/evaluate-events', label: 'Evaluate Events' },
    { path: '/judge/assign-event', label: 'Assign to Event' },
    {path: '/judge/my-events', label: 'My Events' },
  ],
  participant: [
    { path: '/participant-home', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/my-events', label: 'My Events' },
    { path: '/accommodations', label: 'Accommodations' },
  ],
  event_organizer: [
    { path: '/event_organizer-home', label: 'Home' },
    { path: '/organize-events', label: 'Organize Event' },
    { path: '/event-organizer/approved-events', label: 'My Events' },
    {path :'/add-sponsorships-packages', label: 'Add Sponsorship'},
    {path :'/view-event-details', label: 'View Event Details'},
    { path: '/organizer/sponsor-amount',  label: 'Sponsor Amount' },
    {path: '/sponsor-income-report' , label: 'Sponsor Report'}
  ],
  sponsor: [
    { path: '/sponsor-home', label: 'Home' },
    { path: '/sponsor-events', label: 'Browse Packages' },
    { path: '/sponsor/payments', label: 'My Payments' },
    { path: '/sponsor/approved-events', label: 'My Events' },

  ]
};

const Navbar = ({ role }) => {
  const location = useLocation();
  const links = navOptions[role] || [];
  const navigate = useNavigate(); // Assuming imported

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const GetUserRole = (role) => {
    if (role === 'event_organizer') {
      return 'event organizer';
    } else {
      return role;
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the token
    localStorage.removeItem('userRole'); // Clear the role
    const redirectPage = `/${role}-login`;
    navigate(redirectPage); // Redirect to login page}
    window.location.reload(); // Refresh the page
  }
return (
    <div className='mb-20'>

    <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
             isScrolled ? 'bg-slate-900 shadow-md' : 'bg-transparent'
          } transition-colors duration-500`}
        >
          <div className="container mx-auto px-4 py-3 flex items-center bg-slate-900">
            <h2 className="text-xl min-w-20 font-bold capitalize text-white">{GetUserRole(role)} Panel</h2>
            <div className="flex justify-center w-full">
              <ul className="flex gap-4 text-white">
                {links.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={index} className="px-4">
                      <Link
                        to={link.path}
                        className={`pb-1 border-b-2 transition duration-200 font-normal ${
                          isActive
                            ? 'border-orange-500'
                            : 'border-transparent hover:border-orange-500'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

            </div>
          <SimpleButton onClick={handleLogout} text="Logout" className="ml-auto" />
          </div>
        </motion.nav>

    </div>
  );
};

export default Navbar;
