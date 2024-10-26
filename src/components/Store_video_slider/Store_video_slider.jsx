import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './StoreVideoSlider.css';
import { getShopLocation } from '../../Admin/Components/Api/Api';
import { imgurl } from '../../Admin/Components/Credentials/Credentials';

const Store_video_slider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '0px',
        },
      },
    ],
  };

  const videoRefs = useRef([]);
  const [loaded, setLoaded] = useState([]);

  const handleVideoLoad = (index) => {
    setLoaded((prevLoaded) => {
      const updatedLoaded = [...prevLoaded];
      updatedLoaded[index] = true;
      return updatedLoaded;
    });
  };

  const [sholocationList, setsholocationList] = useState([]);

  const fetchShopLocationList = async () => {
    try {
      const response = await getShopLocation();
      setsholocationList(response.data.length ? response.data : []);
    } catch (error) {
      console.error('Error fetching shop locations:', error);
    }
  };

  useEffect(() => {
    fetchShopLocationList();
  }, []);

  return (
    <div className='overflow-hidden z-[99] relative bg-white md:pt-[50px] px-[10px]'>
      <div className='text-center my-[15px]'>
        <h2 className='lg:text-[45px] font-bold font-lato text-[35px]'>OUR STORES</h2>
      </div>
      <div className='w-full px-[20px] shop_slider'>
        <Slider {...settings}>
          {sholocationList.map((shop, index) => (
            <div key={shop._id} className='p-[5px] relative group'>
              {!loaded[index] && (
                <div className='w-full h-[800px] bg-white'></div>
              )}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={`${imgurl}/${shop.videoName}`} // Use imgurl as base URL for videos
                className={`w-full sm:h-[800px] object-cover ${!loaded[index] ? 'hidden' : ''}`}
                muted
                loop
                autoPlay
                playsInline
                onLoadedData={() => handleVideoLoad(index)}
              />

              <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0'>
                <a href={shop.mapsLink} target="_blank" rel="noopener noreferrer" className='text-white text-xl font-bold flex items-center mb-2'>
                  <span className='mr-2 text-2xl cursor-pointer' aria-hidden="true">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                  </span>
                </a>
                <div className='text-white text-center font-lato md:text-[22px] text-[18px] font-bold px-8'>
                  {shop.address}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Store_video_slider;
