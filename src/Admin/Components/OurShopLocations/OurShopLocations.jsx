import React, { useState, useEffect } from 'react';
import Saidbar from '../Saidbar/Saidbar';
import Modal from 'react-modal';
import { addShopLocation, deleteShopLocation, getShopLocation, updateShopLocation } from '../Api/Api';
import { ToastContainer, toast } from 'react-toastify';
import { imgurl } from '../Credentials/Credentials';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

Modal.setAppElement('#root');

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
        maxHeight: '700px',
        overflowY: 'auto',
        backgroundColor: '#fff',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
        zIndex: '999999999',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};


const OurShopLocations = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [shopDetails, setShopDetails] = useState({
        name: '',
        description: '',
        address: '',
        images: [],
        video: null,
        number: '',
        mapsLink: '',
        mapsgallery: ''
    });

    const [sholocationList, setsholocationList] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShopDetails({ ...shopDetails, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setShopDetails({ ...shopDetails, images: files });
    };

    const handleVideoChange = (e) => {
        setShopDetails({ ...shopDetails, video: e.target.files[0] });
    };

    const openModal = () => {
        setIsOpen(true);
        setModalType('add');
        resetForm();
    };

    const closeModal = () => {
        setIsOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setShopDetails({
            name: '',
            description: '',
            address: '',
            images: [],
            video: null,
            number: '',
            mapsLink: '',
            mapsgallery: ''
        });
    };

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

    const handleAddShopLocation = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', shopDetails.name);
        formData.append('description', shopDetails.description);
        formData.append('address', shopDetails.address);
        formData.append('number', shopDetails.number);
        formData.append('mapsLink', shopDetails.mapsLink);
        formData.append('mapsgallery', shopDetails.mapsgallery);

        shopDetails.images.forEach((image) => {
            formData.append('images', image);
        });

        if (shopDetails.video) {
            formData.append('video', shopDetails.video);
        }

        try {
            const response = await addShopLocation(formData);
            if (response.message === 'Shop location added successfully') {
                toast.success('Shop location added successfully!');
                closeModal();
                fetchShopLocationList();
            } else {
                toast.error('Failed to add shop location.');
            }
        } catch (error) {
            toast.error('An error occurred while adding the shop location.');
            console.error('Error adding shop location:', error);
        }
    };

    const ShopSlider = ({ images }) => (
        <Slider {...sliderSettings}>
            {images.map((image, index) => (
                <div key={index} className="mt-[30px]">
                    <img src={`${imgurl}/${image}`} alt={`Slide ${index}`} className="shop-image h-[220px] w-[100%] rounded-[5px] border-[1px] border-black" />
                </div>
            ))}
        </Slider>
    );

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

    const handleDeleteShopLocation = async (shopId) => {
        try {
            await deleteShopLocation(shopId);
            toast.success('Shop location deleted successfully!');
            fetchShopLocationList();
        } catch (error) {
            toast.error('An error occurred while deleting the shop location.');
            console.error('Error deleting shop location:', error);
        }
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState('');

    const openModal2 = (videoUrl) => {
        setSelectedVideo(videoUrl);
        setModalIsOpen(true);
    };

    const closeModal2 = () => {
        setSelectedVideo('');
        setModalIsOpen(false);
    };

    const [selectedShop, setSelectedShop] = useState(null);
    const [modalType, setModalType] = useState('add');



    const openUpdateModal = (shop) => {
        setSelectedShop(shop);
        setShopDetails({
            name: shop.shopName,
            description: shop.description,
            address: shop.address,
            number: shop.number,
            mapsLink: shop.mapsLink,
            mapsgallery: shop.mapsgallery,
            images: [],
            video: null
        });
        setIsOpen(true);
        setModalType('update');
    };

    const handleUpdateShopLocation = async (e) => {
        e.preventDefault();
        if (!selectedShop) {
            toast.error('No shop selected for update.');
            return;
        }

        console.log("selectedShop:", selectedShop);

        const formData = new FormData();
        formData.append('shopId', selectedShop._id);

        console.log("shopDetails before appending:", shopDetails);

        if (shopDetails.name) formData.append('name', shopDetails.name);
        if (shopDetails.description) formData.append('description', shopDetails.description);
        if (shopDetails.address) formData.append('address', shopDetails.address);
        if (shopDetails.number) formData.append('number', shopDetails.number);
        if (shopDetails.mapsLink) formData.append('mapsLink', shopDetails.mapsLink);
        if (shopDetails.mapsgallery) formData.append('mapsgallery', shopDetails.mapsgallery);

        if (shopDetails.images && shopDetails.images.length > 0) {
            shopDetails.images.forEach((image) => {
                if (image) {
                    formData.append('images', image);
                }
            });
        }

        if (shopDetails.video) {
            formData.append('video', shopDetails.video);
        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await updateShopLocation(formData);
            if (response.message === 'Shop updated successfully') {
                toast.success('Shop location updated successfully!');
                closeModal();
                fetchShopLocationList();
            } else {
                toast.error('Failed to update shop location.');
            }
        } catch (error) {
            toast.error('An error occurred while updating the shop location.');
            console.error('Error updating shop location:', error);
        }
    };




    return (
        <div>
            <Saidbar />
            <div className='sm:ml-[250px] px-[30px] pt-[25px]'>
                <div className='mt-[31px]'>
                    <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">Our Shop Locations</h2>
                </div>
                <div className="text-right mb-4">
                    <button
                        className="bg-black py-[15px] px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
                        onClick={openModal}
                    >
                        Add Shop
                    </button>
                </div>

                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Shop Modal"
                    style={customStyles}
                >
                    <h2 className="text-2xl font-bold mb-4">Add New Shop</h2>
                    <form onSubmit={modalType === 'add' ? handleAddShopLocation : handleUpdateShopLocation}>
                        <div className="mb-4">
                            <label className="block text-lg">Shop Name</label>
                            <input
                                type="text"
                                name="name"
                                value={shopDetails.name}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg">Description</label>
                            <textarea
                                name="description"
                                value={shopDetails.description}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={shopDetails.address}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg">Number</label>
                            <input
                                type="text"
                                name="number"
                                value={shopDetails.number}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg">Maps Link</label>
                            <input
                                type="text"
                                name="mapsLink"
                                value={shopDetails.mapsLink}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg">Gallery Map</label>
                            <input
                                type="text"
                                name="mapsgallery"
                                value={shopDetails.mapsgallery}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg">Upload Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg">Upload Video</label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoChange}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                {modalType === 'add' ? "Add Shop" : "Update Shop"}
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </Modal>


                <div className='mt-8 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[15px]'>
                    {sholocationList.length > 0 ? (
                        sholocationList.map((shop) => (
                            <div key={shop.id} className='border border-black p-4 mb-4 flex flex-col justify-between'>
                                <h3 className="text-xl font-bold">{shop.shopName}</h3>
                                <p className="mt-2">{shop.description}</p>
                                <ShopSlider images={shop.imageNames} />
                                <p className="mt-2 font-bold">Address: {shop.address}</p>
                                <p className="mt-2">Phone: {shop.number}</p>
                                <div className='flex gap-[30px] py-[10px]'>
                                    <a href={shop.mapsLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                        <span><i className="fa fa-angle-right" aria-hidden="true"></i></span> View on Maps
                                    </a>
                                    <a href={shop.mapsgallery} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                        <span><i className="fa fa-angle-right" aria-hidden="true"></i></span> View on Google Images
                                    </a>
                                </div>

                                {shop.videoName && (
                                    <div className="mt-4">
                                        <button
                                            onClick={() => openModal2(shop.videoName)}
                                            className="bg-blue-500 text-white px-4 py-1 rounded"
                                        >
                                            View Video
                                        </button>
                                    </div>
                                )}

                                <div className="mt-2">
                                    <button
                                        onClick={() => openUpdateModal(shop)}
                                        className="bg-black text-white px-4 py-2 rounded mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteShopLocation(shop._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                                {shop.images && shop.images.length > 0 && (
                                    <ShopSlider images={shop.images} />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No shop locations found.</p>
                    )}
                </div>


                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal2}
                    contentLabel="Video Modal"
                    style={customStyles}
                >
                    <h2 className="text-2xl font-bold mb-4">Shop Video</h2>
                    <video controls className="w-full">
                        <source src={`${imgurl}/${selectedVideo}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <button onClick={closeModal2} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">
                        Close
                    </button>
                </Modal>
            </div>
        </div>
    );
};

export default OurShopLocations;
