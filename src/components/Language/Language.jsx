import React, { useEffect } from 'react';

const Language = () => {
  // useEffect(() => {
  //   const addScript = () => {
  //     if (!document.getElementById("google-translate-script")) {
  //       const script = document.createElement('script');
  //       script.id = "google-translate-script";
  //       script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; // Updated
  //       script.async = true;
  //       document.body.appendChild(script);
  //     } else {
  //       // Initialize Google Translate if the script already exists
  //       window.googleTranslateElementInit();
  //     }
  //   };

  //   window.googleTranslateElementInit = () => {
  //     if (window.google && window.google.translate) {
  //       // Create a single TranslateElement
  //       new window.google.translate.TranslateElement(
  //         {
  //           pageLanguage: 'en',
  //           includedLanguages: 'en,hi,gu',
  //         },
  //         "google_translate_element" // Single ID for both instances
  //       );
  //       console.log("Google Translate initialized.");
  //     } else {
  //       console.error("Google Translate not available.");
  //     }
  //   };

  //   addScript();
  // }, []);

  // return <div id="google_translate_element"></div>; // Use the same ID
};

export default Language;
