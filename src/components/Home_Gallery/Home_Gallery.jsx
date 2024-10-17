import React, { useState, useEffect } from 'react';
import { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7 } from '../Images/Images';
import { getOurCulture } from '../../Admin/Components/Api/Api';
import { imgurl } from '../../Admin/Components/Credentials/Credentials';
import Modal from 'react-modal';
import { motion } from 'framer-motion';

Modal.setAppElement('#root');

const Home_Gallery = () => {
  const fallbackGalleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7];
  const [ourCulture, setOurCulture] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
      setOurCulture([]);
    }
  };

  useEffect(() => {
    fetchOurCulture();
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const imagesToShow = ourCulture.length > 0
    ? ourCulture.map(item => `${imgurl}/${item.imageName}`)
    : fallbackGalleryImages;

  const openModal = (index) => {
    setPhotoIndex(index);
    setIsLoading(true);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const nextImage = () => {
    setPhotoIndex((photoIndex + 1) % imagesToShow.length);
    setIsLoading(true);
  };

  const prevImage = () => {
    setPhotoIndex((photoIndex + imagesToShow.length - 1) % imagesToShow.length);
    setIsLoading(true);
  };

  return (
    <div className='bg-[#41414e1a] lg:py-[50px] lg:pt-[180px] pt-[95px]'>
      <div className='lg:max-w-[2000px] m-auto px-[10px]'>
        <div className='text-center pb-[20px] pt-[20px] md:pt-[120px] lg:pt-0'>
          <h1 className={`xl:text-[50px] sm:text-[40px] text-[30px] font-lato font-bold border-b inline-block border-black`}>
            Our Culture
          </h1>
        </div>

        <motion.div
          className='grid 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[20px] py-[35px]'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {imagesToShow.map((image, index) => (
            <motion.div key={index} className='w-[100%]' variants={itemVariants}>
              <img
                src={image}
                alt={`gallery-${index}`}
                className='w-[100%] h-[200px] object-cover rounded-[10px] shadow-lg cursor-pointer'
                onClick={() => openModal(index)}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className='home_gallery'>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='modal-content'
            overlayClassName='modal-overlay'
          >
            <div className='modal-body relative p-[15px]'>
              <button onClick={closeModal} className='modal-close-btn text-center rounded-[50px] text-white bg-black w-[35px] h-[35px]'>X</button>

              <div className='modal-image-container flex items-center justify-center relative'>
                {isLoading && <div className="spinner">Loading...</div>}

                <img
                  src={imagesToShow[photoIndex]}
                  alt={`Modal Image ${photoIndex}`}
                  onLoad={handleImageLoad}
                  className='modal-image max-w-full max-h-[70vh] min-h-[70vh] object-contain'
                />

                {/* Next and Previous buttons */}
                <button className='modal-prev-btn w-[35px] h-[35px] text-center flex justify-center items-center text-white absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-800 p-2 rounded-full shadow-md z-10' onClick={prevImage}>←</button>
                <button className='modal-next-btn w-[35px] h-[35px] text-center flex justify-center items-center text-white absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-800 p-2 rounded-full shadow-md z-10' onClick={nextImage}>→</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Home_Gallery;
