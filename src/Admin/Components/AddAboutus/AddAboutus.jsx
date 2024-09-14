import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Saidbar from '../Saidbar/Saidbar';
import { AddAboutUs, getAboutus, UpdateAboutUs } from '../Api/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { imgurl } from '../Credentials/Credentials';
Modal.setAppElement('#root');

const AddAboutus = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [aboutUsData, setAboutUsData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState(null); // Track current item being edited

    useEffect(() => {
        const fetchAboutUsData = async () => {
            try {
                const data = await getAboutus();
                setAboutUsData(data.data);
                if (data.data.length > 0) {
                    setEditMode(true);
                    setCurrentItem(data.data[0]); // Set the first item to be edited
                }
            } catch (error) {
                console.error('Error fetching About Us data:', error);
            }
        };
        fetchAboutUsData();
    }, []);

    const openModal = (item) => {
        setCurrentItem(item);
        setImagePreview(item ? `${imgurl}/${item.imageName}` : null);
        setContent(item ? item.content : '');
        setImage(null); // Reset image if necessary
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setContent('');
        setImage(null);
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!content || (!image && !editMode)) {
            toast.error('Please fill in all fields!');
            return;
        }
    
        setLoading(true);
    
        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }
        formData.append('content', content);
    
        try {
            let response;
            if (editMode && currentItem && currentItem.id) {
                // Update existing data
                console.log('Updating item with id:', currentItem.id); // Log currentItem.id
                // response = await UpdateAboutUs(currentItem.id, formData); // Include the id for update
                // if (response.message === "About Us updated successfully") {
                //     toast.success('About Us updated successfully!');
                // } else {
                //     toast.error(response.message);
                // }
            } else {
                // Add new data
                response = await AddAboutUs(formData);
                if (response.message === "About Us added successfully") {
                    toast.success('About Us added successfully!');
                } else {
                    toast.error(response.message);
                }
            }
    
            closeModal();
            // Fetch updated data
            const updatedData = await getAboutus();
            setAboutUsData(updatedData.data);
            if (updatedData.data.length > 0) {
                setEditMode(true);
                setCurrentItem(updatedData.data[0]);
            }
        } catch (error) {
            console.error('Error uploading About Us content:', error);
            toast.error('Failed to upload content. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <div>
                <Saidbar />
            </div>
            <div className='ml-[250px] px-[30px] pt-[25px]'>
                <div className='mt-[31px]'>
                    <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">
                        {editMode ? 'Update About Us' : 'Add About Us'}
                    </h2>
                </div>

                <div className="text-right">
                    <button
                        className="bg-black py-[15px] px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
                        onClick={() => openModal(editMode ? currentItem : null)}
                    >
                        {editMode ? 'Update About Us' : 'Add About Us'}
                    </button>
                </div>

                {/* Display About Us Data */}
                <div className="mt-8">
                    {Array.isArray(aboutUsData) ? (
                        aboutUsData.map((item, index) => (
                            <div key={index} className="flex items-center mb-4">
                                <img
                                    src={`${imgurl}/${item.imageName}`}
                                    alt={item.content}
                                    className="w-[100px] h-[100px] object-cover rounded-[8px] mr-[15px]"
                                />
                                <p>{item.content}</p>
                                <button
                                    onClick={() => openModal(item)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                                >
                                    Edit
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        maxWidth: '800px',
                        borderRadius: '10px',
                        padding: '20px',
                    }
                }}
                contentLabel={editMode ? "Update About Us" : "Add About Us"}
            >
                <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">
                    {editMode ? 'Update About Us Content' : 'Add About Us Content'}
                </h2>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4"
                />
                {imagePreview && (
                    <div className="mb-4">
                        <img src={imagePreview} alt="Preview" className='w-[400px] m-auto' />
                    </div>
                )}

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write About Us content here..."
                    className="w-full h-[200px] mb-4 border border-gray-300 p-2"
                />

                <div className="flex justify-end">
                    <button
                        className="bg-black py-[15px] px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px] mr-2"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Submit'}
                    </button>
                    <button
                        className="bg-gray-500 py-[15px] px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    );
}

export default AddAboutus;
