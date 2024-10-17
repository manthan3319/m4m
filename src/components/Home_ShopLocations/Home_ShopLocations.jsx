import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { shop2, userlocation } from '../Images/Images'; // Assuming shop2 is imported correctly

// Custom marker icons
const customMarker = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// User location marker icon
const userMarker = new L.Icon({
    iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="blue">
        <path d="M12 2C8.1 2 5 5.1 5 9c0 3.3 7 13 7 13s7-9.7 7-13c0-3.9-3.1-7-7-7zm0 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});



const shopLocations = [
    {
        id: 1,
        position: [21.1760128, 72.7296861],
        address: 'Ground Laxminarayan Apartment, 2, Ghod Dod Rd, near Airtel Office, Ram Chowk, Athwa, Surat, Gujarat 395007',
        phone: '0261 266 8830',
        mapLink: 'https://www.google.com/maps/dir//Ground+Laxminarayan+Apartment,+2,+Ghod+Dod+Rd,+near+Airtel+Office,+Ram+Chowk,+Athwa,+Surat,+Gujarat+395007/@21.1760128,72.7296861,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be04e7550385589:0x4501b0705e6811ec!2m2!1d72.8120898!2d21.1760262?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D',
        images: [shop2],
    },
    {
        id: 2,
        position: [21.148931, 72.7372156],
        address: 'Plot no.33-42, Near Panchmukhi Hanuman Mandir BRTS, Bamroli Althan Expy, opp. D Mart, Pandesara, Surat, Gujarat 394221',
        phone: '097240 05054',
        mapLink: 'https://www.google.com/maps/dir//Plot+no.33-42,Near+Panchmukhi+Hanuman+Mandir+BRTS,+Bamroli+Althan+Expy,+opp.+D+Mart,+Pandesara,+Surat,+Gujarat+394221/@21.148931,72.7372156,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be051e91f8499c1:0xa4a53d0428323d2!2m2!1d72.8196131!2d21.1489868?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D',
        images: [shop2],
    },
    {
        id: 3,
        position: [21.174396, 72.7224673],
        address: '1st Floor and M-17,18,19 (2nd Floor), Jolly Arcade, U-5, Ghod Dod Rd, Athwa, Surat, Gujarat 395007',
        phone: '070965 64418',
        mapLink: 'https://www.google.com/maps/dir//1st+Floor)+and+M-17,18,19+(2nd+Floor,+Jolly+Arcade,+U-5,+Ghod+Dod+Rd,+Athwa,+Surat,+Gujarat+395007/@21.174396,72.7224673,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be04e7551daaaab:0xe6dbe113612d91ed!2m2!1d72.804869!2d21.174416?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D',
        images: [shop2],
    },
    {
        id: 4,
        position: [21.2022308, 72.7121188],
        address: 'Jay Ranchhod Complex, A/12, Anand Mahal Rd, Adajan, Surat, Gujarat 395009',
        phone: '091737 50504',
        mapLink: 'https://www.google.com/maps/dir//Jay+Ranchhod+Complex,+A%2F12,+Anand+Mahal+Rd,+Adajan,+Surat,+Gujarat+395009/@21.2022308,72.7121188,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be04dafcec8bf65:0xb226ca16d3bab1fe!2m2!1d72.7945205!2d21.2022508?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D',
        images: [shop2],
    },
    {
        id: 5,
        position: [21.205896, 72.7646458],
        address: 'OPP. EFFIL TOWER, Lambe Hanuman Rd, Surat, Gujarat 395007',
        phone: '070433 50504',
        mapLink: 'https://www.google.com/maps/dir//OPP.+EFFIL+TOWER,+Lambe+Hanuman+Rd,+Surat,+Gujarat+395007/@21.205896,72.7646458,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be04f5e30419043:0x564baab9379e4b07!2m2!1d72.8470475!2d21.205916?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D',
        images: [shop2],
    },
    {
        id: 6,
        position: [21.2240221, 72.7409507],
        address: 'Shop no.2,3, Vihat krupa Residency, Opp. Aashiwad dr House, Vadinath Chowk, Ved Rd, Katargam, Surat, Gujarat 395007',
        phone: '070436 50096',
        mapLink: 'https://www.google.com/maps/dir//Shop+no.2,3,+Vihat+krupa+Residency,+Opp.+Aashiwad+dr+House,+Vadinath+Chowk,+Ved+Rd,+Katargam,+Surat,+Gujarat+395007/@21.2240221,72.7409507,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be04ebdda1f0649:0xb1dca04c3e440868!2m2!1d72.8233524!2d21.2240421?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D',
        images: [shop2, shop2, shop2],
    },
    {
        id: 7,
        position: [21.2338489, 72.7981651],
        address: 'Satellite Rd, near YAMUNA CHOWK, Vrundavan Society-1, Mota Varachha, Surat, Gujarat 394101',
        phone: '8734005836',
        mapLink: 'https://www.google.com/maps/dir//Satellite+Rd,+near+YAMUNA+CHOWK,+Vrundavan+Society-1,+Mota+Varachha,+Surat,+Gujarat+394101/@21.2338489,72.7981651,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be04f37ec28abd3:0xd7841969d5f35f06!2m2!1d72.8805668!2d21.2338689?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D',
        images: [shop2, shop2, shop2],
    },
    {
        id: 8,
        position: [21.2354796, 72.7420026],
        address: 'GF 4, Avalon Business Hub, Aamba Talavadi, Priya Park Society, Katargam, Surat, Gujarat 395004',
        phone: '7041207596',
        mapLink: 'https://www.google.com/maps/dir//GF+4,+Avalon+Business+Hub,+Aamba+Talavadi,+Priya+Park+Society,+Katargam,+Surat,+Gujarat+395004/@21.2354796,72.7420026,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be04f8f3ddc2fd7:0x9a600a0b9d532c6d!2m2!1d72.8244043!2d21.2354996?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D',
        images: [shop2, shop2, shop2],
    },
];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const FindNearestShop = ({ nearestShop }) => {
    const map = useMap();

    useEffect(() => {
        if (nearestShop && nearestShop.position) {
            map.setView(nearestShop.position, 13, {
                animate: true,
            });
        }
    }, [nearestShop, map]);

    return null;
};

const ShopLocation = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [nearestShop, setNearestShop] = useState(null);
    const markerRefs = useRef([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (error) => {
                console.error("Error getting user location", error);
            }
        );
    }, []);

    const findNearestShop = () => {
        if (userLocation) {
            let minDistance = Infinity;
            let nearest = null;

            shopLocations.forEach((shop, index) => {
                const distance = calculateDistance(userLocation.lat, userLocation.lon, shop.position[0], shop.position[1]);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = shop;
                }
            });

            if (nearest) {
                setNearestShop(nearest);

                // Open the popup for the nearest shop
                const markerIndex = shopLocations.findIndex(shop => shop.id === nearest.id);
                if (markerRefs.current[markerIndex]) {
                    markerRefs.current[markerIndex].openPopup();
                }
            }
        }
    };

    return (
        <div className='relative'>
            <button onClick={findNearestShop} className="bg-black rounded-lg text-white font-poppins z-[9999] absolute bottom-[10px] right-[10px] p-[10px]">Nearby Me</button>

            <MapContainer
                center={[21.1760128, 72.8120898]}
                zoom={11}
                style={{ height: '600px', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {/* Display user location */}
                {userLocation && (
                    <Marker className="text-[45px]" position={[userLocation.lat, userLocation.lon]} icon={userMarker}>
                        <Popup>
                            <div>
                                <p>You are here!</p>
                            </div>
                        </Popup>
                    </Marker>
                )}

                {/* Display shop locations */}
                {shopLocations.map((shop, index) => (
                    <Marker
                        key={shop.id}
                        position={shop.position}
                        icon={customMarker}
                        ref={(el) => markerRefs.current[index] = el}
                    >
                        <Popup>
                            <div>
                                <h3>{shop.address}</h3>
                                <p>Phone: {shop.phone}</p>
                                {userLocation && (
                                    <p>
                                        Distance: {calculateDistance(userLocation.lat, userLocation.lon, shop.position[0], shop.position[1]).toFixed(2)} km
                                    </p>
                                )}
                                <a href={shop.mapLink} target="_blank" rel="noopener noreferrer">Get Directions</a>
                                <br />
                                <img src={shop.images[0]} alt="Shop" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Find nearest shop and fly to it */}
                {nearestShop && <FindNearestShop nearestShop={nearestShop} />}
            </MapContainer>
        </div>
    );
};

export default ShopLocation;