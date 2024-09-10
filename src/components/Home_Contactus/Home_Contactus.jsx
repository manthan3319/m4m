import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Home_Contactus = () => {
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

    return (
        <div className='bg-white z-[9999999] relative overflow-hidden'>
            <div className={`${location.pathname !== '/contactus' ? 'lg:py-[80px] py-[50px]' : 'bg-[#41414e1a] py-[100px] lg:pt-[180px]'}`}>
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
                            WELCOME TO M4M SUPPORT. WE'RE HERE TO HELP.
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
                        {/* Brand */}
                        <motion.div 
                            className='flex md:flex-row flex-col xl:w-[30%] lg:w-[50%] md:w-[50%] w-[100%] items-center gap-[20px] p-[25px] border-black border-[1px] justify-center rounded-[25px]'
                            variants={itemVariants}
                        >
                            <div className='w-[10%]'>
                                <i className="fa fa-phone text-[50px]" aria-hidden="true"></i>
                            </div>
                            <div className='sm:w-[60%]'>
                                <h2 className='font-lato font-bold text-[22px]'>BRAND</h2>
                                <p className='font-poppins text-[#5F5F5F] text-[16px]'>This Number is Toll Free</p>
                                <p className='font-lato font-extrabold text-[20px]'>
                                    <a href="tel:+919558319930" className='text-black'>+91 9558319930</a>
                                </p>
                            </div>
                        </motion.div>

                        {/* Founder */}
                        <motion.div 
                            className='flex md:flex-row flex-col xl:w-[30%] lg:w-[50%] md:w-[50%] w-[100%] items-center gap-[20px] p-[25px] border-black border-[1px] justify-center rounded-[25px]'
                            variants={itemVariants}
                        >
                            <div className='w-[10%]'>
                                <i className="fa fa-phone text-[50px]" aria-hidden="true"></i>
                            </div>
                            <div className='sm:w-[60%]'>
                                <h2 className='font-lato font-bold text-[22px]'>FOUNDER</h2>
                                <p className='font-poppins text-[#5F5F5F] text-[16px]'>This Number is Toll Free</p>
                                <p className='font-lato font-extrabold text-[20px]'>
                                    <a href="tel:+919558319931" className='text-black'>+91 9558319931</a>
                                </p>
                            </div>
                        </motion.div>

                        {/* Selling */}
                        <motion.div 
                            className='flex md:flex-row flex-col xl:w-[30%] lg:w-[50%] md:w-[50%] w-[100%] items-center gap-[20px] p-[25px] border-black border-[1px] justify-center rounded-[25px]'
                            variants={itemVariants}
                        >
                            <div className='w-[10%]'>
                                <i className="fa fa-phone text-[50px]" aria-hidden="true"></i>
                            </div>
                            <div className='sm:w-[60%]'>
                                <h2 className='font-lato font-bold text-[22px]'>SELLER</h2>
                                <p className='font-poppins text-[#5F5F5F] text-[16px]'>This Number is Toll Free</p>
                                <p className='font-lato font-extrabold text-[20px]'>
                                    <a href="tel:+919558319932" className='text-black'>+91 9558319932</a>
                                </p>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Home_Contactus;
