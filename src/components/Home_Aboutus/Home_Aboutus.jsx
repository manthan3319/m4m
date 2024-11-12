import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getAboutus } from '../../Admin/Components/Api/Api';
import { aboutus as defaultImage } from '../Images/Images';
import { imgurl } from '../../Admin/Components/Credentials/Credentials';

const Home_Aboutus = () => {
    const location = useLocation();
    const [aboutUsData, setAboutUsData] = useState(null);

    useEffect(() => {
        const fetchAboutUsData = async () => {
            try {
                const data = await getAboutus();
                setAboutUsData(data.data.length > 0 ? data.data[0] : null);
            } catch (error) {
                console.error('Error fetching About Us data:', error);
            }
        };
        fetchAboutUsData();
    }, []);

    return (
        <div className='bg-white z-[9999999] relative overflow-hidden '>
            <div className={`py-[50px] ${location.pathname !== '/aboutus' ? 'bg-[#000000e8] lg:mt-[80px] mt-[50px]' : 'bg-[#41414e1a] md:pt-[180px] pt-[120px]'}`}>
                <div className='lg:max-w-[2000px] m-auto px-[10px]'>
                    <div className='flex md:flex-row items-center gap-[25px] flex-col'>
                        
                        {/* Image Section */}
                        <motion.div 
                            className='md:w-[50%]'
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <img 
                                src={aboutUsData?.image ? `${imgurl}/${aboutUsData.image}` : defaultImage} 
                                className='w-[100%] m-auto' 
                                alt='fashion img' 
                            />
                        </motion.div>

                        {/* Text Section */}
                        <motion.div 
                            className='md:w-[50%]'
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <h2 className={`text-[45px] font-bold font-lato mb-[25px] ${location.pathname !== '/' ? 'text-black' : 'text-white'}`}>
                                About Us
                            </h2>
                            <p className={`text-[22px] font-poppins ${location.pathname !== '/' ? 'text-black' : 'text-white'}`}>
                                {aboutUsData?.content || 'M4M For Men is the complete clothing store for Men. M4M For Men has experienced extraordinary growth and become most popular Men’s wear studio in Surat. It is a mega showroom of all types of Readymade Garments for Men. We offer the latest collection of Jeans, Shirts, Cotton Pants, T-Shirts, Blazers, and Capris. We present a very good range of the latest fashion and Ethnic wear collection for Gents.'}
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home_Aboutus;
