import React from 'react';
import Countdown from './Countdown';
import Navbar from './navbar';
import Cards from './HighlightCard';

const HomePage = ({ roles }) => {
  return (
    <div className="bg-slate-800 text-white">
      {/* Navbar */}
      <Navbar role={roles} />

      {/* Hero Section */}

      <div className="w-full h-screen py-16 px-6 md:px-20 bg-[url(/herosection.jpeg)] flex justify-center items-center">
      </div>

      <section className="bg-cover bg-center flex items-center justify-center text-center px- w-full h-screen">
         {/* style={{ backgroundImage: `url('/homesection.jpg')` }}> */}
        <div className="bg-slate-900 bg-opacity-50 p-8 rounded-xl max-w-screen-xl ">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4 ">Welcome to Grand Tech Fest</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">Join us for an exhilarating journey of innovation, tech, and talent at one of the most awaited events of the year.</p>
        </div>
      </section>

      {/* University Section */}
      <div className="w-full h-screen py-16 px-6 md:px-20 bg-[url(/fast.jpg)]">
      </div>

      {/* University Details */}
      <section className="bg-cover bg-center flex items-center justify-center text-center px- w-full h-screen">
            <div className="bg-slate-900 bg-opacity-50 p-8 rounded-xl max-w-screen-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">ABOUT  FAST  ISLAMABAD</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">The National University of 
            Computer and Emerging Sciences FAST-NUCES, Islamabad campus, stands as a beacon of excellence
              in higher education. Known for nurturing some of the top
               minds in the country, FAST continues to foster innovation
               and entrepreneurship through a rigorous academic environment and a vibrant student community.

            </p>
            </div>
      </section>

            {/* Highlights Section */}
      <section className="py-16 bg-slate-800 px-6">
        <h2 className=" text-center text-orange-500 mb-10 text-4xl md:text-5xl font-bold">Last Year Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Cards headingtext={"Tech Showcase"} text={'Experience the future with innovations and startups presented by talented students and entrepreneurs from all over the country.' } imagepath={'/tech.jpg'}/>
          <Cards  headingtext ={"Cultural Fest"} text = {"Music, art, and colors witness a night of vibrant culture and celebration hosted by FASTians."} imagepath={'/concert.jpg'}/>
          <Cards headingtext={'Sports'} text = {'Sports text here...'} imagepath={'/sport.jpg'} />
          <Cards headingtext={'Games'} text = {'Game text here...'} imagepath={ '/robowars.jpg'} />

        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-slate-800 px-6">
        <div className="flex justify-center bg-slate-900 rounded-lg">
          <Countdown targetDate="2025-05-30T00:00:00" />
        </div>
      </section>


    </div>
  );
};

export default HomePage;
