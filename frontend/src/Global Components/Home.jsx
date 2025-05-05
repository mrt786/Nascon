import React from 'react';
import Countdown from './Countdown';
import Cards from './HighlightCard';
import { Section } from '../Animations/SectionScroll';
import PageWrapper from '../Animations/PageFadeIn';

const HomePage = ({ roles }) => {
  return (
    <PageWrapper>

<div className="bg-slate-800 text-white">

      {/* Hero Section */}

      <div className=" h-screen bg-[url('/herosection.jpeg')] bg-cover bg-center bg-no-repeat py-16 px-6 md:px-20">
    </div>

      <Section className="bg-cover bg-center flex items-center justify-center text-center px- w-full h-screen">
         {/* style={{ backgroundImage: `url('/homeSection.jpg')` }}> */}
        <div className="bg-slate-900 bg-opacity-50 p-8 rounded-xl max-w-screen-xl border border-orange-500 ">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4 ">Welcome to Grand Tech Fest</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">Join us for an exhilarating journey of innovation, tech, and talent at one of the most awaited events of the year.</p>
        </div>
      </Section>

      {/* University Section */}
      <div className="h-screen bg-[url('/fast.jpg')] bg-cover bg-center bg-no-repeat py-16 px-6 md:px-20">
</div>


      {/* University Details */}
      <Section className="bg-cover bg-center flex items-center justify-center text-center px- w-full h-screen">
            <div className="bg-slate-900 bg-opacity-50 p-8 rounded-xl max-w-screen-xl border border-orange-500">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">ABOUT  FAST  ISLAMABAD</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">The National University of 
            Computer and Emerging Sciences FAST-NUCES, Islamabad campus, stands as a beacon of excellence
              in higher education. Known for nurturing some of the top
               minds in the country, FAST continues to foster innovation
               and entrepreneurship through a rigorous academic environment and a vibrant student community.

            </p>
            </div>
      </Section>

            {/* Highlights Section */}
      <Section className="py-16 bg-slate-800 px-6 ">
        <h2 className=" text-center text-orange-500 mb-10 text-4xl md:text-5xl font-bold">Last Year Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Cards headingtext={"Tech Showcase"} text={'Experience the future with innovations and startups presented by talented students and entrepreneurs from all over the country.' } imagepath={'/tech.jpg'}/>
          <Cards  headingtext ={"Cultural Fest"} text = {"Music, art, and colors witness a night of vibrant culture and celebration hosted by FASTians."} imagepath={'/concert.jpg'}/>
          <Cards headingtext={'Sports'} text = {' Engaging in athletic activities offers a multitude of benefits, from physical fitness to personal development and even fostering social cohesion.'} imagepath={'/sport.jpg'} />
          <Cards headingtext={'Games'} text = {'Games are a creative and mindful expression of the human spirit which comes out through the creation of an activity that has an entertaining, flexible, instructive and competing for an element.'} imagepath={ '/robowars.jpg'} />

        </div>
      </Section>

      {/* Countdown Section */}
      <Section className="py-16 bg-slate-800 px-6 h-screen">
        <div className="flex justify-center bg-slate-900 rounded-lg border border-orange-500">
          <Countdown targetDate="2025-05-30T00:00:00" />
        </div>
      </Section>


    </div>
    </PageWrapper>
  );
};

export default HomePage;
