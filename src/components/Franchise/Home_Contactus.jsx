import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getContactDetails } from '../../Admin/Components/Api/Api';

const Franchise = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1, y: 0, transition: {
                type: 'spring', stiffness: 50, staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const location = useLocation();

    const [aboutUsData, setAboutUsData] = useState([]);

    const fetchAboutUsData = async () => {
        try {
            const data = await getContactDetails();
            if (data.success && data.data) {
                setAboutUsData(data.data);
            }
        } catch (error) {
            console.error('Error fetching About Us data:', error);
        }
    };

    useEffect(() => {
        fetchAboutUsData();
    }, []);

    // Filter franchise data based on the role
    const franchiseData = aboutUsData.find(item => item.role === "Franchise");

    return (
        <div className='bg-white z-[9999999] relative overflow-hidden'>
            <div className='bg-[#41414e1a] py-[120px] lg:pt-[200px]'>
                <div className='lg:max-w-[2000px] m-auto px-[10px]'>
                    <motion.div
                        className='text-center'
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h1
                            className='xl:text-[39px] font-lato font-bold text-[24px]'
                            variants={itemVariants}
                        >
                            WELCOME TO M4M .
                        </motion.h1>
                        <motion.p
                            className='sm:text-[25px] font-poppins text-[#0F0F0F] text-[15px]'
                            variants={itemVariants}
                        >
                            ALWAYS ON YOUR SIDE WHEN YOU NEED HELP
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className='flex justify-center gap-[25px] mt-[50px] lg:flex-row flex-col items-center lg:items-stretch'
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >

                        {/* Franchise */}
                        {franchiseData && (
                            <div
                                className='flex md:flex-row flex-col xl:w-[30%] lg:w-[50%] md:w-[50%] w-[100%] items-center gap-[25px] p-[25px] border-black border-[1px] justify-center rounded-[25px] cursor-pointer'
                                variants={itemVariants}
                            >
                                <a href={`mailto:${franchiseData.contact}`} className='flex w-full items-center gap-[15px]'>
                                    <div className='w-[10%]'>
                                        <i className="fa fa-envelope lg:text-[45px] text-[40px]" aria-hidden="true"></i>
                                    </div>
                                    <div className='sm:w-[60%]'>
                                        <h2 className='font-lato font-bold text-[22px]'>FRANCHISE</h2>
                                        <p className='font-lato font-extrabold text-[20px] text-black'>{franchiseData.contact}</p>
                                    </div>
                                </a>
                            </div>
                        )}

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Franchise;
