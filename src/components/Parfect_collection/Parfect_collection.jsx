import React from 'react';
import { motion } from 'framer-motion';
import { logo2, men1, men2, men3, men4 } from '../Images/Images';
import { Link } from 'react-router-dom';

const Parfect_collection = () => {
  return (
    <div className='bg-white z-[9999999] relative overflow-hidden'>
      <div className='lg:max-w-[2000px] m-auto px-[10px] py-[50px]'>
        <div className='text-center'>
          <h1 className='font-lato lg:text-[45px] text-black font-bold text-[25px]'>FIND YOUR PERFECT COLLECTION</h1>
        </div>

        <div className='flex justify-between mt-[35px] gap-[10px] md:flex-row flex-col'>
          {/** First Card */}
          <motion.div
            className='relative md:w-[35%] w-[100%]'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/location">
              <picture>
                <source srcSet={men1.replace('.jpg', '.webp')} type="image/webp" />
                <source srcSet={men1.replace('.jpg', '.avif')} type="image/avif" />
                <img src={men1} alt='men1' className='w-[100%] h-[100%] object-cover' loading="lazy" />
              </picture>
              <div className='absolute inset-0 bg-black opacity-70 rounded-[20px]'></div>
              <div className='absolute inset-0 flex flex-col justify-end p-[20px]'>
                <h2 className='text-white text-[24px] font-lato font-bold'>Collection</h2>
                <p className='text-white text-[16px] font-poppins'>Your order of 100 or more</p>
                <button className='bg-[#D4A373] text-black px-4 py-2 rounded mt-4'>Shop Now</button>
              </div>
            </Link>
          </motion.div>

          {/** Second Card */}
          <motion.div
            className='md:w-[35%] w-[100%] flex flex-col justify-between gap-[10px]'
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/location">
              <div className='relative'>
                <picture>
                  <source srcSet={men2.replace('.jpg', '.webp')} type="image/webp" />
                  <source srcSet={men2.replace('.jpg', '.avif')} type="image/avif" />
                  <img src={men2} alt='men2' className='w-[100%] h-[100%] object-cover' loading="lazy" />
                </picture>
                <div className='absolute inset-0 bg-black opacity-70 rounded-[20px]'></div>
                <div className='absolute inset-0 flex flex-col justify-center p-[20px]'>
                  <h2 className='text-white text-[24px] font-lato font-bold'>For Men</h2>
                  <p className='text-white text-[16px] font-poppins'>100% new style for you.</p>
                </div>
              </div>
            </Link>
            <div>
              <picture>
                <img src={logo2} alt='logo' className='m-auto w-[135px]' />
              </picture>
            </div>
            <div className='relative'>
              <Link to="/location">
                <picture>
                  <source srcSet={men3.replace('.jpg', '.webp')} type="image/webp" />
                  <source srcSet={men3.replace('.jpg', '.avif')} type="image/avif" />
                  <img src={men3} alt='men3' className='w-[100%] h-[100%] object-cover rounded-[20px]' loading="lazy" />
                </picture>
                <div className='absolute inset-0 bg-black opacity-70 rounded-[20px]'></div>
                <div className='absolute inset-0 flex flex-col justify-center p-[20px]'>
                  <h2 className='text-white text-[24px] font-lato font-bold'>New Collection</h2>
                  <p className='text-white text-[16px] font-poppins'>100% new style for you.</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/** Third Card */}
          <motion.div
            className='relative md:w-[35%] w-[100%]'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/location">
              <picture>
                <source srcSet={men4.replace('.jpg', '.webp')} type="image/webp" />
                <source srcSet={men4.replace('.jpg', '.avif')} type="image/avif" />
                <img src={men4} alt='men4' className='w-[100%] h-[100%] object-cover' loading="lazy" />
              </picture>
              <div className='absolute inset-0 bg-black opacity-70 rounded-[20px]'></div>
              <div className='absolute inset-0 flex flex-col justify-end p-[20px]'>
                {/* <h2 className='text-white text-[24px] font-lato font-bold'>Sale Up to 50% Off</h2> */}
                <p className='text-white text-[16px] font-poppins'>Fashion For Men 2024</p>
                <button className='bg-[#D4A373] text-black px-4 py-2 rounded mt-4'>Shop Now</button>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Parfect_collection;
