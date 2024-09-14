import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Saidbar from '../Saidbar/Saidbar';
import { addOurCulture, deleteOurCulture, getOurCulture } from '../Api/Api';
import { imgurl } from '../Credentials/Credentials';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // Ensure this matches your root element

const Add_Our_Culture = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [ourCulture, setOurCulture] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImages([]);
    setFiles([]);
    setModalIsOpen(false);
  };

  const handleImageChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedImages(newFiles.map(file => URL.createObjectURL(file)));
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    try {
      const response = await addOurCulture(files); // Use the new API function
      toast.success('Images uploaded successfully!');
      fetchOurCulture(); // Refresh the image list after upload
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images.');
    }
    closeModal();
  };

  const fetchOurCulture = async () => {
    try {
      const response = await getOurCulture();
      setOurCulture(response.data.length ? response.data : []);
    } catch (error) {
      console.error('Error fetching Our Culture:', error);
    }
  };

  useEffect(() => {
    fetchOurCulture();
  }, []);

  const handleDeleteClick = async (ourCultureId) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    
    if (!isConfirmed) {
      // User clicked "Cancel", so exit the function
      return;
    }

    try {
      const response = await deleteOurCulture(ourCultureId); 
      if (response.data.messages === "Our culture deleted successfully") {
        toast.success('Our culture deleted successfully');
        fetchOurCulture();  // Refresh the culture list after deletion
      } else {
        toast.error('Failed to delete culture: ' + response.data.messages);
      }
    } catch (error) {
      console.error('Error deleting culture:', error);
      toast.error("An error occurred while deleting the culture.");
    }
  };

  const customStyles = {
    content: {
      top: '55%', // Default top position for larger screens
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      padding: '20px',
      '@media (max-width: 640px)': { // For small screens (sm)
        top: '50%',
      },
    },
  };

  return (
    <div>
      <div>
        <Saidbar />
      </div>
      <div className='sm:ml-[250px] px-[30px] pt-[25px]'>
        <div className='mt-[31px]'>
          <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">Our Culture</h2>
        </div>

        <div>
          <div className='text-right'>
            <button
              onClick={openModal}
              className="bg-black py-[15px] px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
            >
              Add Our Culture
            </button>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Upload Images"
        style={customStyles}
      >
        <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">Upload Images</h2>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="mb-4"
        />
        <div className="flex flex-wrap">
          {selectedImages.map((image, index) => (
            <div key={index} className="w-[150px] h-[150px] m-2">
              <img
                src={image}
                alt={`preview ${index}`}
                className="w-full h-full object-cover rounded-[8px]"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-[10px] mt-4">
          <button
            onClick={closeModal}
            className="bg-black py-[15px] hover:bg-gray-600 px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="bg-black py-[15px] px-[25px] hover:bg-gray-600 text-white font-roboto rounded-[25px] font-bold text-[18px]"
          >
            Upload
          </button>
        </div>
      </Modal>

      {/* Display Images */}
      <div className='sm:ml-[250px] px-[30px] pt-[25px]'>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
          {ourCulture.map((item) => (
            <div key={item._id} className="relative  m-2">
              <img
                src={`${imgurl}/${item.imageName}`}
                alt={item.imageName}
                className="w-full h-full object-cover rounded-[8px]"
              />
              <button
                onClick={() => handleDeleteClick(item._id)}
                className="absolute top-0 right-0 p-2 bg-red-600 text-white rounded-full"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Add_Our_Culture;
