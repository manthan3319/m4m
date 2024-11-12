import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Language from '../Language/Language';
import logo2 from '../Images/logo.png';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About us', href: '/aboutus' },
  { name: 'Stores', href: '/location' },
  { name: 'Our Blog', href: '/blog' },
  { name: 'Our Culture', href: '/gallery' },
  { name: 'Franchise', href: '/franchise' },
  { name: 'Contact Us', href: '/contactus', isContact: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = logo2; // Preload logo image
  }, []);

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMenuClick = (href) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      scrollToSection(href);
    }
    if (isOpen) {
      toggleDrawer();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='w-full'>
      {/* Desktop Navbar */}
      <div className={`z-[999999999999] px-[50px] py-[10px] md:flex-col justify-between items-center w-full md:block hidden transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-white fixed top-[21px]' : 'bg-transparent fixed top-[38px] left-0'}`}>
        
        <div className='flex justify-between'>
          <div className="text-white text-2xl font-bold cursor-pointer">
            <Link to="/">
              <img src={logo2} className={`w-[150px] ${isScrolled || location.pathname !== '/' ? '' : 'filter invert brightness-0'}`} alt='Logo' />
            </Link>
          </div>
          <div className="lg:gap-[55px] md:gap-[25px] flex items-center">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`lg:text-[20px] md:text-[18px] font-bold font-lato cursor-pointer ${item.isContact ? 'bg-[#1e40af] px-4 py-2 rounded-md text-white' : ''} ${isScrolled || location.pathname !== '/' ? "text-black" : 'text-white'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="border-b-[1px] border-black z-[999999999] fixed top-[27px] left-0 py-[10px] justify-between items-center w-full block md:hidden bg-white px-[10px] transition-all duration-300">
        <div className='flex items-center w-[100%] justify-between '>
          <div onClick={() => scrollToSection('#home')} className="cursor-pointer">
            <Link to="/"> <img src={logo2} className='w-[120px]' alt='Logo' /></Link>
          </div>

          <div>
            <button onClick={toggleDrawer}>
              <i className="fa fa-bars text-black text-[35px]" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <Drawer open={isOpen} onClose={toggleDrawer} direction='right'>
          <div className="gap-[10px] flex flex-col px-[10px] py-[20px]">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleMenuClick(item.href)}
                className={`text-black text-[20px] font-bold font-lato cursor-pointer ${item.isContact ? 'bg-[#1e40af] px-4 py-2 rounded-md mt-[15px] text-white' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
