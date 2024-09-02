import React from 'react';
import { motion } from 'framer-motion';
import { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8 } from '../Images/Images';

const Home_Gallery = () => {
  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery5, gallery3, gallery1];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between each image
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className='bg-[#41414e1a] lg:py-[50px] lg:pt-[120px] pt-[100px]'>
      <div className='lg:max-w-[2000px] m-auto px-[10px]'>
        <div className='text-center lg:mb-[50px]'>
          <h1 className='text-black lg:text-[80px] text-[40px] font-oxanium font-bold'>
            <span className=' relative text-customBlue'>Our Culture</span>
          </h1>
        </div>

        <motion.div
          className='flex flex-wrap justify-center gap-[20px] py-[35px]'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {galleryImages.map((image, index) => (
            <motion.div key={index} className='sm:w-[20%] w-[45%]' variants={itemVariants}>
              <img src={image} alt={`gallery-${index}`} className='w-[100%] sm:min-h-[200px] sm:max-h-[200px] min-h-[150px]  object-cover rounded-[10px] shadow-lg' />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Home_Gallery;
