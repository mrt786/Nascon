import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Global Components/Navbar';
import { getUserRole } from '../utils/auth';
import { motion } from 'framer-motion';
import InputBox from '../Global Components/InputBox';
import SimpleButton from '../Global Components/SimpleButton';
import AnimatedForm from '../Animations/AnimatedForms';
import { toast } from 'sonner';

const levels = [
  { value: 'title_sponsor', label: 'Title Sponsor' },
  { value: 'gold_sponsor', label: 'Gold Sponsor' },
  { value: 'silver_sponsor', label: 'Silver Sponsor' },
  { value: 'media_partner', label: 'Media Partner' },
];

const AddSponsorshipPackages = () => {
  const userRole = getUserRole();
  const [eventId, setEventId] = useState('');
  const [packages, setPackages] = useState([
    { sponsor_level: '', sponsor_amount: '' },
  ]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePackageChange = (index, field, value) => {
    const updated = [...packages];
    updated[index][field] = value;
    setPackages(updated);
  };

  const addPackage = () => {
    setPackages(prev => [...prev, { sponsor_level: '', sponsor_amount: '' }]);
  };

  const removePackage = (index) => {
    setPackages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!eventId) {
      toast.error('Event ID is required.');
      return;
    }
    const valid = packages.every(p => p.sponsor_level && p.sponsor_amount > 0);
    if (!valid) {
      toast.error('All packages must have a level and amount > 0.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/event-organizer/add-sponsorship-packages',
        { event_id: eventId, sponsorships: packages },
        { headers: { Authorization: `${token}` } }
      );
      setSuccess('Packages added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add packages.');
    }
  };

  if (userRole !== 'event_organizer') {
    return <p className="text-center text-red-500 mt-10">Access denied. Only event organizers can add packages.</p>;
  }

  return (
    <div className="bg-slate-800 min-h-screen text-white pt-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">Add Sponsorship Packages</h1>
        {/* <AnimatedForm> */}
            <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <InputBox
                type="number"
                bname="event_id"
                bvalue={eventId}
                change={e => setEventId(e.target.value)}
                placeholder="Event ID"
                />
            </motion.div>

            {packages.map((pkg, idx) => (
                <motion.div
                key={idx}
                className="bg-slate-900 p-4 rounded-lg relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                >
                <div className="flex gap-4 items-center">
                    <motion.select
                    value={pkg.sponsor_level}
                    onChange={e => handlePackageChange(idx, 'sponsor_level', e.target.value)}
                    className="flex-1 p-2 rounded text-black"
                    >
                    <option value="">Select Sponsor Level</option>
                    {levels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </motion.select>
                    <InputBox
                    type="number"
                    bname="sponsor_amount"
                    bvalue={pkg.sponsor_amount}
                    change={e => handlePackageChange(idx, 'sponsor_amount', e.target.value)}
                    placeholder="Amount"
                    />
                    {packages.length > 1 && (
                    <button type="button" onClick={() => removePackage(idx)} className="text-red-500 font-bold">
                        &times;
                    </button>
                    )}
                </div>
                </motion.div>
            ))}

            <div className="flex gap-4">
                <SimpleButton type="button" onClick={addPackage} className="bg-orange-500 hover:bg-orange-600" text = {"+ Add Package"}/>
                <SimpleButton type="submit" className="bg-pink-500 hover:bg-pink-600" text = {" Submit Packages"}/>
            </div>

            {error && <p className="text-red-400">{error}</p>}
            {success && <p className="text-green-400">{success}</p>}
            </form>
        {/* </AnimatedForm> */}
      </div>
    </div>
  );
};

export default AddSponsorshipPackages;

