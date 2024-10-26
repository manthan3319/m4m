import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Topbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);
  const location = useLocation(); 

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Event listeners for scroll and resize
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine background color based on scroll, screen width, and location
  const bgClass = isWideScreen
    ? isScrolled || location.pathname !== '/' ? 'bg-white' : 'bg-transparent'
    : 'bg-white';

  return (
    <div className={`topbar ${bgClass} px-[20px]`}>
      <div id="google_translate_element" />
    </div>
  );
};

export default Topbar;
