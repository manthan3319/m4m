import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
// import pandesra2 from "../Images/pandesra 2.mp4";
// import ramchok from "../Images/ram chok 2.mp4";
// import adajan from "../Images/adajan 5.mp4";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Store_video_slider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '80px',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '50px',
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        }
      }
    ]
  };

  const videoRefs = useRef([]);
  const [loaded, setLoaded] = useState([false, false, false]);

  const handlePlayAllVideos = () => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.play();
      }
    });
  };

  const handleVideoLoad = (index) => {
    setLoaded(prevLoaded => {
      const updatedLoaded = [...prevLoaded];
      updatedLoaded[index] = true;
      return updatedLoaded;
    });
  };

  // const shopDetails = [
  //   {
  //     address: "Plot no.33-42, Near Panchmukhi Hanuman Mandir BRTS, Bamroli Althan Expy, opp. D Mart, Pandesara, Surat, Gujarat 394221",
  //     videoSrc: pandesra2,
  //     mapLink: "https://maps.google.com/?q=Plot+no.33-42,+Near+Panchmukhi+Hanuman+Mandir+BRTS,+Bamroli+Althan+Expy,+opp.+D+Mart,+Pandesara,+Surat,+Gujarat+394221"
  //   },
  //   {
  //     address: "Ground Laxminarayan Apartment, 2, Ghod Dod Rd, near Airtel Office, Ram Chowk, Athwa, Surat, Gujarat 395007",
  //     videoSrc: ramchok,
  //     mapLink: "https://maps.google.com/?q=Ground+Laxminarayan+Apartment,+2,+Ghod+Dod+Rd,+near+Airtel+Office,+Ram+Chowk,+Athwa,+Surat,+Gujarat+395007"
  //   },
  //   {
  //     address: "Jay Ranchhod Complex, A/12, Anand Mahal Rd, Adajan, Surat, Gujarat 395009",
  //     videoSrc: adajan,
  //     mapLink: "https://maps.google.com/?q=Jay+Ranchhod+Complex,+A/12,+Anand+Mahal+Rd,+Adajan,+Surat,+Gujarat+395009"
  //   },
  // ];

  return (
    <></>
    // <div className='overflow-hidden z-[99] relative bg-white pt-[50px]'>
    //   <div className='text-center my-[15px]'>
    //     <h2 className='lg:text-[45px] font-bold font-lato'>OUR STORES</h2>
    //   </div>
    //   <div className='w-full'>
    //     <Slider {...settings} beforeChange={handlePlayAllVideos}>
    //       {shopDetails.map((shop, index) => (
    //         <div key={index} className='p-[5px] relative group'>
    //           {!loaded[index] && (
    //             <div className='w-full h-[800px] bg-white'></div>
    //           )}
    //           <video
    //             ref={el => videoRefs.current[index] = el}
    //             src={shop.videoSrc}
    //             className={`w-full sm:h-[800px] object-cover ${!loaded[index] ? 'hidden' : ''}`}
    //             muted
    //             autoPlay
    //             loop
    //             onLoadedData={() => handleVideoLoad(index)}
    //           />
    //           <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0'>
    //             <a href={shop.mapLink} target="_blank" rel="noopener noreferrer" className='text-white text-xl font-bold flex items-center mb-2'>
    //               <span className='mr-2 text-2xl cursor-pointer' aria-hidden="true" >
    //               <i class="fa fa-map-marker" aria-hidden="true"></i>
    //               </span>
    //             </a>
    //             <div className='text-white text-center px-4'>
    //               {shop.address}
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </Slider>
    //   </div>
    // </div>
  );
};

export default Store_video_slider;
