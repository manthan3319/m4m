import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logo, logo2 } from '../Images/Images';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About us', href: '/aboutus' },
  { name: 'Stores', href: '/location' },
  { name: 'Our Blog', href: '/blog' },
  { name: 'Our Culture', href: '/gallery' },
  { name: 'Contact Us', href: '/contactus', isContact: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Scroll to the top of the element
      });
    }
  };

  const handleMenuClick = (href) => {
    if (href.startsWith('/')) {
      navigate(href); // Handle page navigation
    } else if (href.startsWith('#')) {
      scrollToSection(href);
    }
    if (isOpen) {
      toggleDrawer();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Handle scroll to top for new routes
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    handleRouteChange(); // Scroll to top on initial render or route change
  }, [location.pathname]);

  return (
    <div className='w-full'>
      <div
        className={`z-[999999999999] px-[50px] py-[10px] md:flex justify-between items-center w-full md:block hidden transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-white navabr_shadow fixed' : 'bg-transparent fixed top-0 left-0'}`}
      >
        <div
          className="text-white text-2xl font-bold cursor-pointer"
        >
          <Link to="/">
          <img src={logo2} className={`w-[150px] ${isScrolled || location.pathname !== '/' ? '' : 'logo_filter'}`} alt='Logo' />
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

      <div className="border-b-[1px] border-black z-[999999999] fixed top-0 left-0 py-[10px] justify-between items-center w-full block md:hidden bg-white px-[20px] transition-all duration-300">
        <div className='flex items-center w-[100%] justify-between'>
          <div onClick={() => scrollToSection('#home')} className="cursor-pointer">
            <img src={logo} className='w-[120px]' alt='Logo' />
          </div>

          <div>
            <button onClick={toggleDrawer}>
              <i className="fa fa-bars text-black text-[35px]" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction='right'
        >
          <div className="gap-[10px] flex flex-col px-[20px] py-[20px]">
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
}

export default Navbar;
