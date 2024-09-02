import React, { useState } from 'react';
import Home_ShopLocations from '../Home_ShopLocations/Home_ShopLocations';
import { gallery7, shop2, shop3, shop4, shop5, shop6, shop7, shop8 } from '../Images/Images';
import { useSpring, animated } from '@react-spring/web';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocation } from 'react-router-dom';
import pandesra2 from "../Images/pandesra 2.mp4";
import Modal from 'react-modal';
const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000
};

const ShopeLocation = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('');

    // Open video modal
    const openModal = (video) => {
        setCurrentVideo(video);
        setIsModalOpen(true);
    };

    // Close video modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentVideo('');
    };

    // Slider component for displaying images
    const ShopSlider = ({ images }) => (
        <Slider {...sliderSettings}>
            {images.map((image, index) => (
                <div key={index} className="mt-[30px]">
                    <img src={image} alt={`Slide ${index}`} className="shop-image h-[220px] w-[100%] rounded-[5px] border-[1px] border-black" />
                </div>
            ))}
        </Slider>
    );
    const locations = [
        {
            name: 'M4M For Men - Ghod Dod Road',
            description: "Men's clothing store in Surat, Gujarat",
            address: 'Ground Laxminarayan Apartment, 2, Ghod Dod Rd, near Airtel Office, Ram Chowk, Athwa, Surat, Gujarat 395007',
            image: [gallery7, gallery7],
            number: 9558319830,
            video: pandesra2,
            mapsLink: 'https://www.google.com/maps/place/M4M+For+Men/@21.158408,72.7756413,8108m/data=!3m2!1e3!5s0x3be04e733e9b527b:0xd7f663dcb28f2d24!4m6!3m5!1s0x3be04e7550385589:0x4501b0705e6811ec!8m2!3d21.1760328!4d72.8120878!16s%2Fg%2F1q67g9j8p?entry=ttu&g_ep=EgoyMDI0MDgyMy4wIKXMDSoASAFQAw%3D%3D',
            mapsgallery: 'https://www.google.com/maps/place/M4M+For+Men/@21.1759685,72.8120437,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipPboLdpUs4n09Vza3CsdcSBU887Z0vMVPWkmhZK!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPboLdpUs4n09Vza3CsdcSBU887Z0vMVPWkmhZK%3Dw86-h114-k-no!7i3480!8i4640!4m17!1m9!3m8!1s0x3be04e7550385589:0x4501b0705e6811ec!2sM4M+For+Men!8m2!3d21.1760328!4d72.8120878!9m1!1b1!16s%2Fg%2F1q67g9j8p!3m6!1s0x3be04e7550385589:0x4501b0705e6811ec!8m2!3d21.1760328!4d72.8120878!10e5!16s%2Fg%2F1q67g9j8p?entry=ttu&g_ep=EgoyMDI0MDgyMy4wIKXMDSoASAFQAw%3D%3D',
        },
        {
            name: 'M4M For Men - Bamroli Althan Expy',
            description: "Men's clothing store in Surat, Gujarat",
            address: 'Plot no.33-42,Near Panchmukhi Hanuman Mandir BRTS, Bamroli Althan Expy, opp. D Mart, Pandesara, Surat, Gujarat 394221',
            image: [shop2, shop2],
            video: pandesra2,
            number: 9558319830,
            mapsLink: 'https://www.google.com/search?sca_esv=daea6010b195fdb0&sca_upv=1&tbs=lf:1,lf_ui:4&tbm=lcl&sxsrf=ADLYWIIvooNWa3qkg4j07XkKgPvAmZKN8w:1724840675212&q=m4m&rflfq=1&num=10&sa=X&ved=2ahUKEwiwyvWdvJeIAxUB8zgGHdtdPWsQjGp6BAgqEAE&biw=1920&bih=911&dpr=1#rlfi=hd:;si:741497242590061522,l,CgNtNG0iA4gBAUj3m-3ayLKAgAhaCRAAGAAiA200bZIBE21lbnNfY2xvdGhpbmdfc3RvcmWqATUQASoHIgNtNG0oADIfEAEiGxfRaShODX71Z-LMwdgG-hOn44Y3dk4Msiw64TIHEAIiA200bQ;mv:[[21.206418615894442,72.81970313068847],[21.14439125314145,72.73670485493163]]',
            mapsgallery: 'https://www.google.com/search?sca_esv=daea6010b195fdb0&sca_upv=1&tbs=lf:1,lf_ui:4&tbm=lcl&sxsrf=ADLYWIIvooNWa3qkg4j07XkKgPvAmZKN8w:1724840675212&q=m4m&rflfq=1&num=10&sa=X&ved=2ahUKEwiwyvWdvJeIAxUB8zgGHdtdPWsQjGp6BAgqEAE&biw=1920&bih=911&dpr=1#rlfi=hd:;si:741497242590061522,l,CgNtNG0iA4gBAUj3m-3ayLKAgAhaCRAAGAAiA200bZIBE21lbnNfY2xvdGhpbmdfc3RvcmWqATUQASoHIgNtNG0oADIfEAEiGxfRaShODX71Z-LMwdgG-hOn44Y3dk4Msiw64TIHEAIiA200bQ;mv:[[21.206418615894442,72.81970313068847],[21.14439125314145,72.73670485493163]]&lpg=cid:CgIgAQ%3D%3D,ik:CAoSLEFGMVFpcFBQaFVONjdjQXk3ekl4ZFh6emRJeHJJVTRWMTZRVkY2a0VKakFV',

        },
        {
            name: 'M4M For Men - Ghod Dod Rd, Athwa',
            description: "Men's clothing store in Surat, Gujarat",
            address: ' 1st Floor) and M-17,18,19 (2nd Floor, Jolly Arcade, U-5, Ghod Dod Rd, Athwa, Surat, Gujarat 395007',
            number: 9558319830,
            video: pandesra2,
            image: [shop3, shop3],
            mapsLink: 'https://www.google.com/search?sca_esv=daea6010b195fdb0&sca_upv=1&tbs=lf:1,lf_ui:4&tbm=lcl&sxsrf=ADLYWIIvooNWa3qkg4j07XkKgPvAmZKN8w:1724840675212&q=m4m&rflfq=1&num=10&sa=X&ved=2ahUKEwiwyvWdvJeIAxUB8zgGHdtdPWsQjGp6BAgqEAE&biw=1920&bih=911&dpr=1#rlfi=hd:;si:16635137121974063597,l,CgNtNG0iA4gBAUjBtPnImq6AgAhaCRAAGAAiA200bZIBE21lbnNfY2xvdGhpbmdfc3RvcmWqATUQASoHIgNtNG0oADIfEAEiGxfRaShODX71Z-LMwdgG-hOn44Y3dk4Msiw64TIHEAIiA200bQ;mv:[[21.240692499999998,72.88572959999999],[21.143758,72.7893577]]',
            mapsgallery: 'https://www.google.com/maps/place/M4M+For+Men/@21.1759685,72.8120437,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipPboLdpUs4n09Vza3CsdcSBU887Z0vMVPWkmhZK!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPboLdpUs4n09Vza3CsdcSBU887Z0vMVPWkmhZK%3Dw86-h114-k-no!7i3480!8i4640!4m7!3m6!1s0x3be04e7550385589:0x4501b0705e6811ec!8m2!3d21.1760328!4d72.8120878!10e5!16s%2Fg%2F1q67g9j8p?entry=ttu&g_ep=EgoyMDI0MDgyMy4wIKXMDSoASAFQAw%3D%3D',

        },
        {
            name: 'M4M For Men - Anand Mahal Road',
            description: "Men's clothing store in Surat, Gujarat",
            address: ' Jay Ranchhod Complex, A/12, Anand Mahal Rd, Adajan, Surat, Gujarat 395009',
            number: 9558319830,
            video: pandesra2,
            image: [shop4, shop4],
            mapsLink: 'https://www.google.com/search?sca_esv=daea6010b195fdb0&sca_upv=1&tbs=lf:1,lf_ui:4&tbm=lcl&sxsrf=ADLYWIIvooNWa3qkg4j07XkKgPvAmZKN8w:1724840675212&q=m4m&rflfq=1&num=10&sa=X&ved=2ahUKEwiwyvWdvJeIAxUB8zgGHdtdPWsQjGp6BAgqEAE&biw=1920&bih=911&dpr=1#rlfi=hd:;si:12837169987256496638,l,CgNtNG0iA4gBAUiQs-Cg_7SAgAhaCRAAGAAiA200bZIBE21lbnNfY2xvdGhpbmdfc3RvcmWqATUQASoHIgNtNG0oADIfEAEiGxfRaShODX71Z-LMwdgG-hOn44Y3dk4Msiw64TIHEAIiA200bQ;mv:[[21.240692499999998,72.88572959999999],[21.143758,72.7893577]]',
            mapsgallery: 'https://www.google.com/maps/place/M4M+for+Men/@21.2022189,72.7944141,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipNYBWqpeE3su-x89XHqvGs6dbivinueXf5PUXTq!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNYBWqpeE3su-x89XHqvGs6dbivinueXf5PUXTq%3Dw114-h86-k-no!7i4624!8i3468!4m21!1m13!4m12!1m4!2m2!1d72.792461!2d21.1382256!4e1!1m6!1m2!1s0x3be04dafcec8bf65:0xb226ca16d3bab1fe!2sM4M+for+Men,+Jay+Ranchhod+Complex,+A%2F12,+Anand+Mahal+Rd,+Adajan,+Surat,+Gujarat+395009!2m2!1d72.7945205!2d21.2022508!3m6!1s0x3be04dafcec8bf65:0xb226ca16d3bab1fe!8m2!3d21.2022508!4d72.7945205!10e5!16s%2Fg%2F11n_v1j6dj?entry=ttu&g_ep=EgoyMDI0MDgyMy4wIKXMDSoASAFQAw%3D%3D',

        },
        {
            name: 'M4M For Men - Lambe Hanuman Road',
            description: "Men's clothing store in Surat, Gujarat",
            address: ' OPP. EFFIL TOWER, Lambe Hanuman Rd, Surat, Gujarat 395007',
            number: 9558319830,
            video: pandesra2,
            image: [shop5, shop5],
            mapsLink: 'https://www.google.com/search?sca_esv=daea6010b195fdb0&sca_upv=1&tbs=lf:1,lf_ui:4&tbm=lcl&sxsrf=ADLYWIIvooNWa3qkg4j07XkKgPvAmZKN8w:1724840675212&q=m4m&rflfq=1&num=10&sa=X&ved=2ahUKEwiwyvWdvJeIAxUB8zgGHdtdPWsQjGp6BAgqEAE&biw=1920&bih=911&dpr=1#rlfi=hd:;si:6218251422993894151,l,CgNtNG0iA4gBAUiqvIWHyK6AgAhaCRAAGAAiA200bZIBE21lbnNfY2xvdGhpbmdfc3RvcmWqATUQASoHIgNtNG0oADIfEAEiGxfRaShODX71Z-LMwdgG-hOn44Y3dk4Msiw64TIHEAIiA200bQ;mv:[[21.206418615894442,72.81970313068847],[21.14439125314145,72.73670485493163]]',
            mapsgallery: 'https://www.google.com/maps/place/M4M+For+Men/@21.2067811,72.8470531,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipOrf4ZG6FuiLhdqL6XnBZBTscFIv5f5yBxeblRg!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOrf4ZG6FuiLhdqL6XnBZBTscFIv5f5yBxeblRg%3Dw114-h86-k-no!7i4160!8i3120!4m7!3m6!1s0x3be04f5e30419043:0x564baab9379e4b07!8m2!3d21.205916!4d72.8470475!10e5!16s%2Fg%2F11gl0g2rkb?entry=ttu&g_ep=EgoyMDI0MDgyMy4wIKXMDSoASAFQAw%3D%3D',

        },
        {
            name: 'M4M For Men -  Ved Rd, Katargam',
            description: "Men's clothing store in Surat, Gujarat",
            address: ' Shop no.2,3, Vihat krupa Residency, Opp. Aashiwad dr House, Vadinath Chowk, Ved Rd, Katargam, Surat, Gujarat 395007',
            number: 9558319830,
            video: pandesra2,
            image: [shop6, shop6],
            mapsLink: 'https://www.google.com/search?sca_esv=daea6010b195fdb0&sca_upv=1&tbs=lf:1,lf_ui:4&tbm=lcl&sxsrf=ADLYWIIvooNWa3qkg4j07XkKgPvAmZKN8w:1724840675212&q=m4m&rflfq=1&num=10&sa=X&ved=2ahUKEwiwyvWdvJeIAxUB8zgGHdtdPWsQjGp6BAgqEAE&biw=1920&bih=911&dpr=1#rlfi=hd:;si:12816294888912193640,l,CgNtNG0iA4gBAUikl7zZtK6AgAhaCRAAGAAiA200bZIBE21lbnNfY2xvdGhpbmdfc3RvcmWqATUQASoHIgNtNG0oADIfEAEiGxfRaShODX71Z-LMwdgG-hOn44Y3dk4Msiw64TIHEAIiA200bQ;mv:[[21.206418615894442,72.81970313068847],[21.14439125314145,72.73670485493163]]',
            mapsgallery: 'https://www.google.com/maps/place/M4M+For+Men/@21.2239534,72.8233522,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMRhPdrxVSPY8wm2jJTge0gAJawtjpVC1Dv2-Jz!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMRhPdrxVSPY8wm2jJTge0gAJawtjpVC1Dv2-Jz%3Dw114-h86-k-no!7i4000!8i3000!4m7!3m6!1s0x3be04ebdda1f0649:0xb1dca04c3e440868!8m2!3d21.2240421!4d72.8233524!10e5!16s%2Fg%2F11gf5lz2y4?entry=ttu&g_ep=EgoyMDI0MDgyMy4wIKXMDSoASAFQAw%3D%3D',

        },
        {
            name: 'M4M For Men -  Mota Varachha',
            description: "Men's clothing store in Surat, Gujarat",
            address: ' Satellite Rd, near YAMUNA CHOWK, Vrundavan Society-1, Mota Varachha, Surat, Gujarat 394101',
            number: 9558319830,
            video: pandesra2,
            image: [shop7, shop7],
            mapsLink: 'https://www.google.com/search?sca_esv=daea6010b195fdb0&sca_upv=1&tbs=lf:1,lf_ui:4&tbm=lcl&sxsrf=ADLYWIIvooNWa3qkg4j07XkKgPvAmZKN8w:1724840675212&q=m4m&rflfq=1&num=10&sa=X&ved=2ahUKEwiwyvWdvJeIAxUB8zgGHdtdPWsQjGp6BAgqEAE&biw=1920&bih=911&dpr=1#rlfi=hd:;si:15529565357432069894,l,CgNtNG0iA4gBAUjf6LPTj72AgAhaCRAAGAAiA200bZIBE21lbnNfY2xvdGhpbmdfc3RvcmWqATUQASoHIgNtNG0oADIfEAEiGxfRaShODX71Z-LMwdgG-hOn44Y3dk4Msiw64TIHEAIiA200bQ;mv:[[21.206418615894442,72.81970313068847],[21.14439125314145,72.73670485493163]]',
            mapsgallery: 'https://www.google.com/maps/place/M4M+for+Men/@21.2339426,72.8805063,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMgRHLv2juVbeMH67C2pVZlcI0NcKXw7JPj_uCe!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMgRHLv2juVbeMH67C2pVZlcI0NcKXw7JPj_uCe%3Dw86-h114-k-no!7i1200!8i1600!4m7!3m6!1s0x3be04f37ec28abd3:0xd7841969d5f35f06!8m2!3d21.2338689!4d72.8805668!10e5!16s%2Fg%2F11y3y6ty2_?entry=ttu&g_ep=EgoyMDI0MDgyMy4wIKXMDSoASAFQAw%3D%3D',

        },
        {
            name: 'M4M for Men - katargam Avalon',
            description: "Men's clothing store in Surat, Gujarat",
            address: ' GF 4, Avalon Business Hub, Aamba Talavadi, Priya Park Society, Katargam, Surat, Gujarat 395004',
            number: 9558319830,
            video: pandesra2,
            image: [shop8, shop8],
            mapsLink: 'https://www.google.com/search?sca_esv=daea6010b195fdb0&sca_upv=1&tbs=lf:1,lf_ui:4&tbm=lcl&sxsrf=ADLYWIIvooNWa3qkg4j07XkKgPvAmZKN8w:1724840675212&q=m4m&rflfq=1&num=10&sa=X&ved=2ahUKEwiwyvWdvJeIAxUB8zgGHdtdPWsQjGp6BAgqEAE&biw=1920&bih=911&dpr=1#rlfi=hd:;si:11123902124605516909,l,CgNtNG0iA4gBAUjTspzL7bqAgAhaCRAAGAAiA200bZIBE21lbnNfY2xvdGhpbmdfc3RvcmWqATUQASoHIgNtNG0oADIfEAEiGxfRaShODX71Z-LMwdgG-hOn44Y3dk4Msiw64TIHEAIiA200bQ;mv:[[21.206418615894442,72.81970313068847],[21.14439125314145,72.73670485493163]]',
            mapsgallery: 'https://www.google.com/maps/place/M4M+for+Men+katargam+Avalon/@21.2353916,72.8244244,27a,54.2y/data=!3m8!1e2!3m6!1sAF1QipOS5HrZHGunVQ28zLHZU8kh2ZonXjsq2ufr1Rho!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOS5HrZHGunVQ28zLHZU8kh2ZonXjsq2ufr1Rho%3Dw86-h114-k-no!7i3024!8i4032!4m7!3m6!1s0x3be04f8f3ddc2fd7:0x9a600a0b9d532c6d!8m2!3d21.2354996!4d72.8244043!10e5!16s%2Fg%2F11vwdqg6bm?entry=ttu&g_ep=EgoyMDI0MDgyMy4wIKXMDSoASAFQAw%3D%3D',

        },
    ];

    const springProps = useSpring({
        from: { opacity: 0, transform: 'translate3d(0,-10px,0)' },
        to: { opacity: 1, transform: 'translate3d(0,0,0)' },
        delay: 200,
    });
    const location = useLocation();

    return (
        <div className='bg-[#41414e1a]  z-[99] relative overflow-hidden bg-white'>
            <div className={`lg:max-w-[2000px] m-auto px-[10px]  ${location.pathname !== '/' ? 'pt-[50px] lg:mt-[100px]' : ' pt-[35px] '}`}>
                <div className='text-center pb-[50px]'>
                    <h1 className={`xl:text-[50px] font-lato font-bold border-b inline-block border-black`}>
                        OUR SHOP LOCATIONS
                    </h1>
                </div>
                <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] mb-[30px]'>
                {locations.map((location, index) => (
                    <animated.div key={index} style={springProps} className='bg-white p-[15px] rounded-[10px] border-[1px] border-black hover:shadow-lg transition-shadow duration-300'>
                        <div>
                            <h1 className='text-[22px] font-semibold font-lato'>{location.name}</h1>
                            <p>{location.description}</p>
                        </div>
                        <ShopSlider images={location.image} />
                        <div className='mt-[20px] mb-[90px]'>
                            <p><b>Address:</b> {location.address}</p>
                        </div>
                        <div className='flex justify-between mt-[20px] absolute bottom-0 w-[90%]'>
                            <a href={location.mapsLink} target="_blank" rel="noopener noreferrer">
                                <div className='flex flex-col items-center gap-[5px] text-blue-600 hover:text-blue-800 cursor-pointer'>
                                    <span className='text-[30px]'>
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

                            <div onClick={() => openModal(location.video)} className='flex flex-col items-center gap-[5px] text-blue-600 hover:text-blue-800 cursor-pointer'>
                                <span className='text-[25px]'>
                                    <i className="fa fa-play" aria-hidden="true"></i>
                                </span>
                                <button onClick={() => openModal(location.video)} className="text-blue-500 underline">Watch Video</button>
                            </div>
                        </div>
                    </animated.div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Video Modal"
                className="modal absolute top-0 z-[999999999] sm:bg-[#000000b3]"
                overlayClassName="overlay"
            >
                <button onClick={closeModal} className="close-button"><i class="fa fa-times" aria-hidden="true"></i></button>
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
