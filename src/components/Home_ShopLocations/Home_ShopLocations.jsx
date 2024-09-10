import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Custom marker icon with black color and text "M4M"
const customMarker = L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color:black; color:white; padding:10px; border-radius:50%; text-align:center; width:40px; height:40px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold;">M4M</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const shopLocations = [
    { id: 1, position: [21.1736, 72.8311], name: 'Ground Laxminarayan Apartment, 2, Ghod Dod Rd, near Airtel Office, Ram Chowk, Athwa, Surat, Gujarat 395007', photo: 'https://via.placeholder.com/150' },
    { id: 2, position: [21.1786, 72.8352], name: 'Plot no.33-42, Near Panchmukhi Hanuman Mandir BRTS, Bamroli Althan Expy, opp. D Mart, Pandesara, Surat, Gujarat 394221', photo: 'https://via.placeholder.com/150' },
    { id: 3, position: [21.1730, 72.8322], name: '1st Floor) and M-17,18,19 (2nd Floor, Jolly Arcade, U-5, Ghod Dod Rd, Athwa, Surat, Gujarat 395007', photo: 'https://via.placeholder.com/150' },
    { id: 4, position: [21.1812, 72.8274], name: 'Jay Ranchhod Complex, A/12, Anand Mahal Rd, Adajan, Surat, Gujarat 395009', photo: 'https://via.placeholder.com/150' },
    { id: 5, position: [21.1714, 72.8360], name: 'OPP. EFFIL TOWER, Lambe Hanuman Rd, Surat, Gujarat 395007', photo: 'https://via.placeholder.com/150' },
    { id: 6, position: [21.1756, 72.8241], name: 'Shop no.2,3, Vihat Krupa Residency, Opp. Aashiwad dr House, Vadinath Chowk, Ved Rd, Katargam, Surat, Gujarat 395007', photo: 'https://via.placeholder.com/150' },
    { id: 7, position: [21.1783, 72.8256], name: 'Satellite Rd, near YAMUNA CHOWK, Vrundavan Society-1, Mota Varachha, Surat, Gujarat 394101', photo: 'https://via.placeholder.com/150' },
    { id: 8, position: [21.1744, 72.8218], name: 'GF 4, Avalon Business Hub, Aamba Talavadi, Priya Park Society, Katargam, Surat, Gujarat 395004', photo: 'https://via.placeholder.com/150' },
];
const Home_ShopLocations = () => {
    const location = useLocation();
    const [mapInstance, setMapInstance] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        if (mapInstance && userLocation) {
            mapInstance.setView(userLocation, 15);
        }
    }, [mapInstance, userLocation]);

    useEffect(() => {
        // Get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    alert("Unable to retrieve your location. Please ensure location services are enabled.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleNearbyMeClick = () => {
        if (userLocation && mapInstance) {
            mapInstance.setView(userLocation, 15);
        } else {
            alert("Unable to determine your location. Please make sure location services are enabled.");
        }
    };

    return (
        <div className='bg-white z-[9999999] relative overflow-hidden'>
            <div className={`${location.pathname !== '/location' ? 'lg:mt-[0px]' : ' '}`}>
                <div className={`lg:max-w-[2000px] m-auto px-[10px]`}>
                    <div
                        className='text-center'
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, staggerChildren: 0.2 } },
                        }}
                    >
                        <motion.h1 
                            className={`xl:text-[39px] font-lato font-bold ${location.pathname !== '/location' ? 'block mb-[10px]' : 'hidden'}`}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            OUR SHOP LOCATIONS
                        </motion.h1>
                        <button 
                            onClick={handleNearbyMeClick}
                            className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-[1000]"
                        >
                            Nearby Me
                        </button>
                    </div>
                </div>
                <div className='w-full h-[500px] relative'>
                    <MapContainer 
                        center={[21.1736, 72.8311]} 
                        zoom={15} 
                        className='h-full w-full' 
                        whenCreated={setMapInstance}  // Set map instance on creation
                    >
                        {/* Base Map Layer */}
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {/* Satellite View Layer (Mapbox) */}
                        <TileLayer
                            url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN"
                            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
                        />
                        {shopLocations.map(location => (
                            <Marker 
                                key={location.id} 
                                position={location.position} 
                                icon={customMarker}
                            >
                                <Popup>
                                    <div>
                                        <img src={location.photo} alt={location.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                                        <p>{location.name}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                        {userLocation && (
                            <Marker position={userLocation} icon={customMarker}>
                                <Popup>You are here</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Home_ShopLocations;


