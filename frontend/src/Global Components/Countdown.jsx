import React, { useEffect, useState } from 'react';

const CountdownComponent = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-05-30T00:00:00');
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null; // event passed
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <p className="text-center text-pink-600 text-xl">🎉 The event has started!</p>;
  }

  return (
    // <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 rounded-xl shadow-md text-white text-center max-w-3xl mx-auto my-10 w-full">
    <div className='  text-white text-center max-w-3xl mx-auto my-10 w-full'>
    <h1 className=" text-orange-500  mb-4 text-4xl md:text-5xl font-bold">Countdown to the Event</h1>
      <div className="flex justify-center space-x-6 text-lg font-semibold">
        <div>
          <span className="block text-3xl">{timeLeft.days}</span>
          <span>Days</span>
        </div>
        <div>
          <span className="block text-3xl">{timeLeft.hours}</span>
          <span>Hours</span>
        </div>
        <div>
          <span className="block text-3xl">{timeLeft.minutes}</span>
          <span>Minutes</span>
        </div>
        <div>
          <span className="block text-3xl">{timeLeft.seconds}</span>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownComponent;
