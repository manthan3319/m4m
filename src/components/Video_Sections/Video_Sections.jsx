import React, { useState, useEffect } from 'react';
import video from "../Images/istockphoto-2159492135-640_adpp_is.mp4";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../Navbar/Navbar';

const Video_Sections = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,  
    threshold: 0.3,     
  });


  return (
    <div className="relative w-full h-[750px]">
      <div className="fixed top-0 left-0 w-full h-[750px] z-10">

        <video
          className="w-full h-full object-cover z-[1]"
          src={video}
          autoPlay
          loop
          muted
        />

        {/* Dark overlay with more opacity */}
        <div className="absolute inset-0 bg-black opacity-60 bg-gradient-to-b from-black via-transparent to-transparent z-[2]"></div>

        {/* Content on top of the video and overlay */}
        <div ref={ref} className="absolute top-0 w-full text-white flex flex-col justify-center items-center h-full p-4 z-[3]">
          <motion.h1
            className="lg:text-[55px] text-[40px] font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Welcome to M4M
          </motion.h1>
          {/* <motion.p
            className="lg:text-[25px] text-center max-w-[1100px] text-[20px] sm:block hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            Discover the latest trends in men's fashion. From stylish jeans to classic blazers, explore our exclusive collection tailored for the modern man.
          </motion.p> */}
        </div>
      </div>
    </div>
  );
}

export default Video_Sections;
