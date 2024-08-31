import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { useLocation  } from 'react-router-dom';



// Custom marker icon
const customMarker = L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color:#0051c8; color:white; padding:10px; border-radius:50%; text-align:center; width:40px; height:40px; display:flex; align-items:center; justify-content:center;">M4M</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const shopLocations = [
    { id: 1, position: [51.505, -0.09], name: 'Shop 1' },
    { id: 2, position: [51.515, -0.1], name: 'Shop 2' },
    { id: 3, position: [51.525, -0.11], name: 'Shop 3' }
];

const Home_ShopLocations = () => {
    const location = useLocation();
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 50,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const markerVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 60,
                damping: 10,
            },
        },
    };

    return (
        <div className='bg-white z-[9999999] relative overflow-hidden '>
        <div className={`${location.pathname !== '/location' ? 'lg:mt-[80px]  ' : ' '}`}>
            <div className={`lg:max-w-[1440px] m-auto px-[20px] `}>
                <motion.div
                    className='text-center'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.h1 
                        className={`xl:text-[39px] font-lato font-bold ${location.pathname !== '/location' ? 'block mb-[10px]' : 'hidden'}`}
                        variants={itemVariants}
                    >
                        OUR SHOP LOCATIONS
                    </motion.h1>
                </motion.div>
            </div>
            <div className='w-full h-[500px] '>
                <MapContainer center={[51.505, -0.09]} zoom={13} className='h-full w-full'>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {shopLocations.map(location => (
                        <Marker 
                            key={location.id} 
                            position={location.position} 
                            icon={customMarker}
                            eventHandlers={{
                                add: (e) => {
                                    // Applying the animation to each marker as it is added
                                    const element = e.target._icon;
                                    if (element) {
                                        element.style.transition = 'transform 0.5s ease-in-out';
                                        element.style.transform = 'scale(0)';
                                        setTimeout(() => {
                                            element.style.transform = 'scale(1)';
                                        }, 100);
                                    }
                                }
                            }}
                        >
                            <Popup>{location.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
        </div>
    );
}

export default Home_ShopLocations;
