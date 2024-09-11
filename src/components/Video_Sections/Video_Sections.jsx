import React from 'react';
import { motion } from 'framer-motion';

const Video_Sections = () => {
  return (
    <div className="relative w-full h-[750px]">
      <div className="fixed top-0 left-0 w-full h-[750px] z-10">
        <video
          className="w-full h-full object-cover z-[1]"
          src="/istockphoto-2159492135-640_adpp_is.mp4"
          autoPlay
          loop
          muted
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60 bg-gradient-to-b from-black via-transparent to-transparent z-[2]"></div>

        {/* Content */}
        <div className="absolute top-0 w-full text-white flex flex-col justify-center items-center h-full p-4 z-[3]">
          <motion.h1
            className="lg:text-[55px] text-[35px] font-bold mb-4 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Welcome to M4M
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

export default Video_Sections;

