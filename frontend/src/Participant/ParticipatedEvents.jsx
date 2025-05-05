import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // for animations
import axios from "axios";

const ParticipatedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's events
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/participant/my-events",
        { headers: { Authorization: token } }
        );
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch participated events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <motion.div
          className="loader"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center bg-slate-800 h-screen  text-gray-500 mt-16">
        No participated events found.
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 py-8 bg-slate-800 h-screen">
      <h1 className="text-3xl text-orange-500 font-bold text-center mb-8">My Participated Events</h1>

      <div className =" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
      <motion.div
        key={event.event_id}
        className="group w-full min-w-sm max-w-md mx-4 bg-slate-900 shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-500 border border-orange-500 text-white overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className=" text-orange-500 capitalize text-xl font-semibold mb-2">{event.event_name}</h2>
        <p className="mb-2">Date: {new Date(event.event_date).toLocaleDateString()}</p>

        <div
          className="max-h-0 overflow-hidden group-hover:max-h-[500px] transition-all duration-700 ease-in-out"
        >
          <p className="mb-2">Category: {event.category}</p>
          <p className="mb-2">Team Name: {event.team_name || "N/A"}</p>
          <p className="mb-2">Current Round: {event.current_round}</p>
          <p className="mb-2">Registration Fee: Rs {event.registration_fee}</p>
          <p className="mb-2">{event.event_description}</p>
          <p className="mb-2">Rules: {event.rules}</p>
        </div>
      </motion.div>
    ))}
      </div>
    </div>
  );
};

export default ParticipatedEvents;
