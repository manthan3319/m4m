import React, { useState, useEffect } from 'react';
import Home_ShopLocations from '../Home_ShopLocations/Home_ShopLocations';
import { useSpring, animated } from '@react-spring/web';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { getShopLocation } from '../../Admin/Components/Api/Api';
import { imgurl } from '../../Admin/Components/Credentials/Credentials';

const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
};

const customStyles = {
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        padding: '20px',
        width: '500px',
        overflowY: 'auto',
        backgroundColor: '#fff',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
        zIndex: '999999999',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};

const ShopeLocation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('');
    const [sholocationList, setsholocationList] = useState([]);
    const location = useLocation();

    const openModal = (video) => {
        setCurrentVideo(video);
        // console.log("video",video)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentVideo('');
    };

    const ShopSlider = ({ images }) => (
        <Slider {...sliderSettings}>
            {images.map((image, index) => (
                <div key={index} className="mt-[30px]">
                    <img
                        src={`${imgurl}/${image}`}
                        alt={`Slide ${index}`}
                        className="shop-image h-[220px] w-[100%] rounded-[5px] border-[1px] border-black"
                    />
                </div>
            ))}
        </Slider>
    );

    const springProps = useSpring({
        from: { opacity: 0, transform: 'translate3d(0,-10px,0)' },
        to: { opacity: 1, transform: 'translate3d(0,0,0)' },
        delay: 200,
    });

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
        <div className='bg-[#41414e1a] z-[99] relative overflow-hidden bg-white'>
            <div className={`lg:max-w-[2000px] m-auto px-[10px] ${location.pathname !== '/' ? 'pt-[50px] lg:mt-[130px]' : ' pt-[30px] '}`}>
                <div className='text-center pb-[50px] pt-[80px] md:pt-[127px] lg:pt-0 '>
                    <h1 className={`xl:text-[50px] sm:text-[40px] text-[30px] font-lato font-bold border-b inline-block border-black`}>
                        OUR SHOP LOCATIONS
                    </h1>
                </div>

                {sholocationList.length === 0 ? (
                    <div className="text-center p-4">
                        <p className="text-lg text-red-600">No shop locations are available. Please try again later.</p>
                    </div>
                ) : (
                    <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] mb-[30px]'>
                        {sholocationList.map((location, index) => (
                            <animated.div key={index} style={springProps} className='bg-white p-[15px] rounded-[10px] border-[1px] border-black hover:shadow-lg transition-shadow duration-300'>
                                <div>
                                    <h1 className='text-[22px] font-semibold font-lato'>{location.shopName}</h1>
                                    <p>{location.description}</p>
                                </div>
                                <ShopSlider images={location.imageNames} />
                                <div className='mt-[20px] mb-[90px]'>
                                    <p><b>Address:</b> {location.address}</p>
                                </div>
                                <div className='flex justify-between flex-nowrap mt-[20px] absolute bottom-0 w-[90%]'>
                                    <a href={location.mapsLink} target="_blank" rel="noopener noreferrer">
                                        <div className='flex flex-col items-center gap-[5px] text-blue-600 hover:text-blue-800 cursor-pointer'>
                                            <span className='text-[25px]'>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            </span>
                                            <p className='font-poppins'>Directions</p>
                                        </div>
                                    </a>
                                    <a href={`tel:${location.number}`} className='flex flex-col items-center gap-[5px] text-blue-600 hover:text-blue-800 cursor-pointer'>
                                        <span className='text-[25px]'>
                                            <i className="fa fa-phone-square" aria-hidden="true"></i>
                                        </span>
                                        <p className='font-poppins'>Call</p>
                                    </a>
                                    <a href={location.mapsgallery} target="_blank" rel="noopener noreferrer">
                                        <div className='flex flex-col items-center gap-[5px] text-blue-600 hover:text-blue-800 cursor-pointer'>
                                            <span className='text-[25px]'>
                                                <i className="fa fa-file-image-o" aria-hidden="true"></i>
                                            </span>
                                            <p className='font-poppins'>Images</p>
                                        </div>
                                    </a>
                                    <div onClick={() => openModal(`${imgurl}/${location.videoName}`)} className='flex flex-col items-center gap-[5px] text-blue-600 hover:text-blue-800 cursor-pointer'>
                                        <span className='text-[25px]'>
                                            <i className="fa fa-play" aria-hidden="true"></i>
                                        </span>
                                        <button className="text-blue-500 underline">Watch Video</button>
                                    </div>
                                </div>

                            </animated.div>
                        ))}
                    </div>
                )}

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Video Modal"
                    className="modal absolute top-0 z-[999999999] sm:bg-[#000000b3]"
                    style={customStyles}
                >
                    <button onClick={closeModal} className="close-button"><i className="fa fa-times" aria-hidden="true"></i></button>
                    <video controls autoPlay className="video-player">
                        <source src={currentVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Modal>
            </div>
            <div className={`${location.pathname !== '/' ? 'hidden' : ' hidden '}`}>
                <Home_ShopLocations />
            </div>
        </div>
    );
};

export default ShopeLocation;
