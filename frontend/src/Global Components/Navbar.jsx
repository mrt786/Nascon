import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // Assuming imported

const navOptions = {
  admin: [
    { path: '/home', label: 'Home' },
    { path: '/create-user', label: 'Create User' },
    { path: '/approve-events', label: 'Approve Events' },
    { path: '/events', label: 'Events' },
    { path: '/accommodation-settings', label: 'Accommodations' },
  ],
  judge: [
    { path: '/home', label: 'Home' },
    { path: '/judge/my-events', label: 'My Events' },
    { path: '/judge/assign-event', label: 'Assign to Event' },
  ],
  participant: [
    { path: '/home', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/my-events', label: 'My Events' },
    { path: '/accommodations', label: 'Accommodations' },
  ],
  event_organizer: [
    { path: '/home', label: 'Home' },
    { path: '/organize-events', label: 'Organize Event' },
    { path: '/event-organizer/approved-events', label: 'My Events' },
  ],
  sponsor: [
    { path: '/home', label: 'Home' },
    { path: '/sponsor-events', label: 'Browse Packages' },
    { path: '/sponsor/payments', label: 'My Payments' },
  ]
};

const Navbar = ({ role }) => {
  const location = useLocation();
  const links = navOptions[role] || [];

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

  return (

    <div className='mb-20'>

    <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`fixed top-0 w-full z-50  ${
             'bg-slate-900 shadow-md' 
          } transition-colors duration-500`}
        >
          <div className="container mx-auto px-4 py-3 flex items-center bg-slate-900">
            <h2 className="text-xl font-bold capitalize text-white">{GetUserRole(role)} Panel</h2>
            <div className="flex justify-center w-full">
              <ul className="flex gap-4 text-white">
                {links.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={index} className="px-4">
                      <Link
                        to={link.path}
                        className={`pb-1 border-b-2 transition duration-200 ${
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
          </div>
        </motion.nav>

    </div>
  );
};

export default Navbar;
