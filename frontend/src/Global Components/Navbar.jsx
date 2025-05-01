import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navOptions = {
  admin: [
    { path: '/home', label: 'Home' },
    {path : '/sponser-events', label: 'Events'},
    { path: '/create-user', label: 'Create User' },
    { path: '/approve-events', label: 'Approve Events' },
    { path: '/admin-events', label: 'Events' },
    { path: '/accommodation-settings', label: 'Accommodations' },
  ],
  judge: [
    { path: '/home', label: 'Home' },
    { path: '/judge-events', label: 'My Events' },
    { path: '/judge-score', label: 'Score Participants' },
  ],
  participant: [
    { path: '/home', label: 'Home' },
    {path : '/events', label: 'Events'},
    { path: '/my-events', label: 'My Events' },
    { path: '/event-register', label: 'Register' },
    { path: '/accommodations', label: 'Accommodations' }

  ],
  event_organizer:[
    { path: '/home', label: 'Home' },
    { path: '/organize-events', label: 'Organize Event' },
    { path: '/approved-events', label: 'Approved' },
    { path: '/pending-events', label: 'Pending Events' }

  ],
  sponsor: [
    {
      path: '/home', label: 'Home'
    },
    { 
      path: '/sponsor-events',
      label: 'Browse Packages' 
    },

    { 
      path: '/sponsor/payments',
      label: 'My Payments' 
    },

  ]
};

const Navbar = ({ role }) => {
    const location = useLocation();

    const links = navOptions[role] || [];

    return (
        <nav className="bg-slate-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center">
            <h2 className="text-xl font-bold capitalize">{role} Panel</h2>
            <div className='flex justify-center w-full'>
                <ul className="flex   gap-4">
                {links.map((link, index) => {
                        const isActive = location.pathname === link.path;
                        return (
                        <li key={index} className='px-4' >
                            <Link
                            to={link.path}
                            className={`pb-1 border-b-2 transition duration-200 ${
                                isActive ? 'border-orange-500' : 'border-transparent hover:border-orange-500'
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
        </nav>
    );
    };

export default Navbar;