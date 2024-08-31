import React from 'react';
import Parfect_collection from '../Parfect_collection/Parfect_collection';
import Home_Aboutus from '../Home_Aboutus/Home_Aboutus';
import Home_Reviews from '../Home_Reviews/Home_Reviews';
import Home_Contactus from '../Home_Contactus/Home_Contactus';
import Home_ShopLocations from '../Home_ShopLocations/Home_ShopLocations';
import Footer from '../Footer/Footer';
import Video_Sections from '../Video_Sections/Video_Sections';
import Home_Category from '../Home_Category/Home_Category';
import Store_video_slider from '../Store_video_slider/Store_video_slider';

const Home = () => {
  return (
    <div>
      <div id="home">
        <Video_Sections />
      </div>
      
      <div className="bg-white">
        <Home_Category />
      </div>
      <div>
        <Store_video_slider/>
      </div>
      <div id="parfect" className="bg-white">
        <Parfect_collection />
      </div>
      <div id="about" className="bg-white">
        <Home_Aboutus />
      </div>
      <div id="reviews" className="bg-white">
        <Home_Reviews />
      </div>
      <div id="contact" className="bg-white">
        <Home_Contactus />
      </div>
      <div id="stores" className="bg-white">
        <Home_ShopLocations />
      </div>
    </div>
  );
}

export default Home;
