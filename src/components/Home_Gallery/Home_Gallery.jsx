import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8 } from '../Images/Images';
import { getOurCulture } from '../../Admin/Components/Api/Api';
import { imgurl } from '../../Admin/Components/Credentials/Credentials';

const Home_Gallery = () => {
  const fallbackGalleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery5, gallery3, gallery1];
  const [ourCulture, setOurCulture] = useState([]);

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

  const fetchOurCulture = async () => {
    try {
      const response = await getOurCulture();
      setOurCulture(response.data.length ? response.data : []);
    } catch (error) {
      console.error('Error fetching Our Culture:', error);
      // If there's an error, fall back to the static images
      setOurCulture([]);
    }
  };

  useEffect(() => {
    fetchOurCulture();
  }, []);

  // Determine which images to display
  const imagesToShow = ourCulture.length > 0
    ? ourCulture.map(item => `${imgurl}/${item.imageName}`)
    : fallbackGalleryImages;

  return (
    <div className='bg-[#41414e1a] lg:py-[50px] lg:pt-[180px] pt-[95px]'>
      <div className='lg:max-w-[2000px] m-auto px-[10px]'>
        <div className='text-center pb-[20px] pt-[20px] md:pt-[120px] lg:pt-0'>
        <h1 className={`xl:text-[50px] sm:text-[40px] text-[30px] font-lato font-bold border-b inline-block border-black`}>
            Our Culture
          </h1>
        </div>
      
        <motion.div
          className='grid lg:grid-cols-7 md:grid-cols-4 grid-cols-2 gap-[20px] py-[35px]'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {imagesToShow.map((image, index) => (
            <motion.div key={index} className='w-[100%]' variants={itemVariants}>
              <img
                src={image}
                alt={`gallery-${index}`}
                className='w-[100%] sm:min-h-[200px] sm:max-h-[200px] min-h-[150px] object-cover rounded-[10px] shadow-lg'
              />
            </motion.div>
          ))}
        </motion.div>
      
      </div>
    </div>
  );
}

export default Home_Gallery;
