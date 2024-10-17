import React from 'react';
import { Link } from 'react-router-dom';
import { logo2 } from '../Images/Images';
import { motion } from 'framer-motion';

const Footer = () => {
    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const iconVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { type: 'spring', stiffness: 50 } }
    };

    const socialLinks = [
        { icon: 'facebook-official', url: 'https://www.facebook.com/m4mformen/photos/?_rdr' },
        { icon: 'instagram', url: 'https://www.instagram.com/m4m_formen/profilecard/?igsh=MTFvOXowejNhd2VsYw==' },
        { icon: 'google', url: 'https://www.google.com/search?q=m4mformen&oq=m4mformen&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIJCAQQABgNGIAEMggIBRAAGA0YHjIGCAYQRRg8MgYIBxBFGDzSAQg0MjU1ajFqN6gCALACAA&sourceid=chrome&ie=UTF-8' }
    ];

    return (
        <div className='bg-black z-[9999999] relative overflow-hidden'>
            <div className='py-[50px]'>
                <div className='lg:max-w-[2000px] px-[10px] m-auto'>
                    <motion.div
                        className='flex flex-wrap gap-[25px] justify-between'
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div className='lg:w-[30%] md:w-[49%] w-[100%]' variants={fadeInVariants}>
                            <img src={logo2} className='w-[180px] logo_filter' alt="M4M logo" />
                            <p className='text-white mt-[25px] font-poppins'>
                                M4M For Men is the complete clothing store for Men. M4M For Men has experienced
                                extraordinary growth and become most popular Men’s wear studio in Surat. It is a mega showroom
                                of all types of Readymade Garments for Men. We offer the latest collection of Jeans, Shirts, Cotton
                                Pants, T-Shirts, Blazers, and Capri’s. We are presenting the very good range of the latest fashion and
                                Ethnic wear collection for Gents.
                            </p>
                        </motion.div>

                        <motion.div className='lg:w-[20%] md:w-[45%] w-[100%]' variants={fadeInVariants}>
                            <h1 className='text-[29px] text-white font-lato font-bold pb-[2px] inline-block border-b-[1px]'>
                                Company
                            </h1>
                            <ul className='mt-[25px] flex flex-col gap-[15px]'>
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'About us', href: '/aboutus' },
                                    { name: 'Blog', href: '/blog' },
                                    { name: 'Stores', href: '/location' },
                                    { name: 'Gallery', href: '/gallery' },
                                    { name: 'Contact Us', href: '/contactus' }
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        className='text-[22px] text-white font-poppins'
                                        variants={fadeInVariants}
                                    >
                                        <Link to={item.href} className='hover:underline'>{item.name}</Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div className='xl:w-[25%] md:w-[100%] w-[100%]' variants={fadeInVariants}>
                            <h1 className='text-[29px] text-white font-lato font-bold pb-[2px] inline-block border-b-[1px]'>
                                Contact Us
                            </h1>
                            <div className='flex flex-row items-center mt-[15px] text-white gap-[25px]'>
                                <i className="fa fa-map-marker text-[30px]" aria-hidden="true"></i>
                                <p>Ground Laxminarayan Apartment, 2, Ghod Dod Rd, Athwa, Surat, Gujarat 395007</p>
                            </div>

                            <div className='flex flex-row items-center mt-[15px] text-white gap-[25px]'>
                                <a href="mailto:info@m4mformen.com" className="flex items-center gap-[25px] text-white">
                                    <i className="fa fa-envelope-o text-[30px]" aria-hidden="true"></i>
                                    <p>info@m4mformen.com</p>
                                </a>
                            </div>

                            <motion.div className='flex mt-[50px] flex-row gap-[25px]'>
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='text-white text-[35px]'
                                        variants={iconVariants}
                                    >
                                        <i className={`fa fa-${social.icon}`} aria-hidden="true"></i>
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <div className='text-center py-[20px] border-t-[1px] mt-[50px]'>
                        <p className='text-white font-oxanium text-[20px]'>
                            <Link to="https://brightensolutions.com/">CopyRight © Brighten Solutions</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
