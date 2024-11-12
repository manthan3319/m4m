import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getContactDetails, updateContact } from '../Api/Api';
import Saidbar from '../Saidbar/Saidbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const ContactDetails = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editData, setEditData] = useState({ role: '', name: '', contact: '', address: '' });
    const [aboutUsData, setAboutUsData] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for form submission

    const openModal = (role, name, contact, address) => {
        setEditData({ role, name, contact, address: address || '' });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const fetchAboutUsData = async () => {
        try {
            const data = await getContactDetails();
            if (data.success && data.data) {
                setAboutUsData(data.data);
            }
        } catch (error) {
            console.error('Error fetching About Us data:', error);
            toast.error('Error fetching contact details');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await updateContact(editData);
            toast.success(response.message);
            fetchAboutUsData();
            closeModal();
        } catch (error) {
            console.error("Error updating contact:", error);
            toast.error("Failed to update contact.");
        } finally {
            setLoading(false); // End loading
        }
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#fff',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    useEffect(() => {
        fetchAboutUsData();
    }, []);

    return (
        <div>
            <div>
                <Saidbar />
            </div>

            <div className='sm:ml-[250px] px-[30px] sm:pt-[25px] pt-[150px] sm:mt-0'>
                <div className='mt-[31px]'>
                    <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">
                        Update Contact Details
                    </h2>
                </div>
                <div className='flex flex-wrap gap-[25px] mt-[50px] items-center lg:items-stretch'>
                    {aboutUsData.map((contact, index) => (
                        <div
                            key={index}
                            className='flex md:flex-row flex-col 2xl:w-[30%] xl:w-[45%] lg:w-[45%] md:w-[100%] w-[100%] items-center gap-[20px] p-[25px] border-black border-[1px] justify-center rounded-[25px] cursor-pointer'
                        >
                            <a href={contact.role === "FOUNDER" ? `mailto:${contact.contact}` : `tel:${contact.contact}`} className='flex w-full items-center gap-[15px]'>
                                <div className='sm:w-[60%]'>
                                    <h2 className='font-lato font-bold text-[22px]'>{contact.role}</h2>
                                    {contact.name && <p className='font-poppins text-[#5F5F5F] text-[16px]'>{contact.name}</p>}
                                    <p className='font-lato font-extrabold text-[20px] text-black'>{contact.contact}</p>
                                    {contact.address && (
                                        <p className="font-lato text-[#5F5F5F] text-[16px]">{contact.address}</p>
                                    )}
                                </div>
                            </a>
                            <button
                                onClick={() => openModal(contact.role, contact.name, contact.contact, contact.address)}
                                className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        ariaHideApp={false}
                        closeTimeoutMS={200}
                    >
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <label className="text-sm font-semibold">
                                    Role:
                                    <input
                                        type="text"
                                        name="role"
                                        value={editData.role}
                                        onChange={handleChange}
                                        className="border p-2 rounded mt-1 w-full"
                                        required
                                    />
                                </label>

                                {editData.name && (
                                    <label className="text-sm font-semibold">
                                        Name:
                                        <input
                                            type="text"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleChange}
                                            className="border p-2 rounded mt-1 w-full"
                                            required
                                        />
                                    </label>
                                )}

                                {editData.contact && (
                                    <label className="text-sm font-semibold">
                                        Contact:
                                        <input
                                            type="text"
                                            name="contact"
                                            value={editData.contact}
                                            onChange={handleChange}
                                            className="border p-2 rounded mt-1 w-full"
                                            required
                                        />
                                    </label>
                                )}

                                {editData.role === "FooterAddress" && (
                                    <label className="text-sm font-semibold">
                                        Address:
                                        <input
                                            type="text"
                                            name="address"
                                            value={editData.address || ""}
                                            onChange={handleChange}
                                            className="border p-2 rounded mt-1 w-full"
                                            required
                                        />
                                    </label>
                                )}

                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </form>
                        </motion.div>
                    </Modal>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ContactDetails;
