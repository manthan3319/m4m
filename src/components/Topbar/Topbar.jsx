import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Topbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);
  const location = useLocation(); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  // Lazy load the Google Translate script
  useEffect(() => {
    const loadGoogleTranslateScript = () => {
      if (!window.googleTranslateElementInit) {
        // Define googleTranslateElementInit globally if not available
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,gu', // Add languages you want to include
          }, 'google_translate_element');
        };

        const script = document.createElement('script');
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; 
        script.async = true;
        script.defer = true; // Ensures the script is executed after HTML is loaded
        document.head.appendChild(script);

        script.onload = () => {
          console.log("Google Translate script loaded successfully");
        };
      }
    };

    loadGoogleTranslateScript();

    return () => {
      // Cleanup the script when the component is unmounted
      const script = document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

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
