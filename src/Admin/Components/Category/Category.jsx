import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Saidbar from '../Saidbar/Saidbar';
import { imgurl } from '../Credentials/Credentials';
import { addCategory, deleteCategory, getCategory, updateCategory } from '../Api/Api'; // Ensure updateCategory is imported
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import '../admin.css'
// Custom styles for Modal (you can customize it)
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

Modal.setAppElement('#root');

const Category = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [comingSoon, setComingSoon] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoriesPerPage] = useState(5);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setCategoryName('');
    setImage(null);
    setPreview('');
    setComingSoon(false);
    setModalIsOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);
  const handleComingSoonChange = () => setComingSoon(!comingSoon);

  const handleSubmit = async () => {
    if (!categoryName || !image) {
      toast('Please provide both a category name and an image.');
      return;
    }

    try {
      const response = await addCategory(categoryName, image, comingSoon);

      if (response.success) {
        toast.success('Category added successfully!');
        closeModal();
        fetchCategories(); // Refresh categories after adding a new one
      } else {
        toast.error('Failed to add category: ' + response.message);
      }
    } catch (error) {
      toast.error('An error occurred while adding the category.');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      if (response.data.length >= 1) {
        setCategories(response.data);
      } else {
        console.error('Failed to fetch categories:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdate = async () => {
    if (!categoryName) {
      alert('Please provide a category name.');
      return;
    }

    try {
      const response = await updateCategory(currentCategory._id, categoryName, image || null, comingSoon);
      if (response.message === "category Update successfully") {
        toast.success('Category updated successfully!');
        closeUpdateModal();
        fetchCategories(); // Refresh categories after updating
      } else {
        toast.error('Failed to update category: ' + response.message);
      }
    } catch (error) {
      toast.error('An error occurred while updating the category.');
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await deleteCategory(id);
      if (response.data.messages === "Category deleted successfully") {
        toast.success('Category deleted successfully!');
        fetchCategories();
      } else {
        toast.error('Failed to delete category: ' + response.messages);
      }
    } catch (error) {
      toast.error('An error occurred while deleting the category.');
    }
  };

  const openUpdateModal = (category) => {
    setCurrentCategory(category);
    setCategoryName(category.categoryName);
    setComingSoon(category.comingSoon);
    setPreview(`${imgurl}/${category.imageName}`);
    setUpdateModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setCurrentCategory(null);
    setCategoryName('');
    setImage(null);
    setPreview('');
    setComingSoon(false);
    setUpdateModalIsOpen(false);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastCategory = (currentPage + 1) * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  return (
    <div className="flex">
      <Saidbar />
      <div className="sm:ml-[250px] px-[30px] pt-[25px] w-full">
        <div className='mt-[31px]'>
          <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">Category List</h2>
        </div>
        <div className="sm:p-4">
          <div>
            <div className="text-right">
              <button
                className="bg-black py-[15px] px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
                onClick={openModal}
              >
                Add Category
              </button>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Add Category Modal"
            >
              <h2 className="text-[20px] font-bold mb-[20px]">Add Category</h2>
              <form>
                <div className="mb-[20px]">
                  <label className="block text-[16px] mb-[10px]">Category Name</label>
                  <input
                    type="text"
                    className="w-full p-[10px] border border-gray-300 rounded-[5px] outline-none"
                    value={categoryName}
                    onChange={handleCategoryNameChange}
                    placeholder="Enter category name"
                  />
                </div>
                <div className="mb-[20px]">
                  <label className="block text-[16px] mb-[10px]">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                  />
                </div>
                {preview && (
                  <div className="mb-[20px]">
                    <label className="block text-[16px] mb-[10px]">Image Preview</label>
                    <img src={preview} alt="Preview" className="w-[200px] h-[200px] rounded-[5px]" />
                  </div>
                )}
                <div className="mb-[20px]">
                  <label className="inline-flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={comingSoon}
                      onChange={handleComingSoonChange}
                      className="mr-[10px]"
                    />
                    Coming Soon
                  </label>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    className="bg-gray-500 py-[10px] px-[20px] text-white font-roboto rounded-[5px] mr-[10px]"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-black py-[10px] px-[20px] text-white font-roboto rounded-[5px]"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Modal>

            <Modal
              isOpen={updateModalIsOpen}
              onRequestClose={closeUpdateModal}
              style={customStyles}
              contentLabel="Update Category Modal"
            >
              <h2 className="text-[20px] font-bold mb-[20px]">Update Category</h2>
              <form>
                <div className="mb-[20px]">
                  <label className="block text-[16px] mb-[10px]">Category Name</label>
                  <input
                    type="text"
                    className="w-full p-[10px] border border-gray-300 rounded-[5px] outline-none"
                    value={categoryName}
                    onChange={handleCategoryNameChange}
                    placeholder="Enter category name"
                  />
                </div>
                <div className="mb-[20px]">
                  <label className="block text-[16px] mb-[10px]">Upload Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                  />
                </div>
                {preview && (
                  <div className="mb-[20px]">
                    <label className="block text-[16px] mb-[10px]">Image Preview</label>
                    <img src={preview} alt="Preview" className="w-[200px] h-[200px] rounded-[5px]" />
                  </div>
                )}
                <div className="mb-[20px]">
                  <label className="inline-flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={comingSoon}
                      onChange={handleComingSoonChange}
                      className="mr-[10px]"
                    />
                    Coming Soon
                  </label>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    className="bg-gray-500 py-[10px] px-[20px] text-white font-roboto rounded-[5px] mr-[10px]"
                    onClick={closeUpdateModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-black py-[10px] px-[20px] text-white font-roboto rounded-[5px]"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </form>
            </Modal>

            <div className="mt-[20px]">
              {currentCategories.map((category) => (
                <div key={category._id} className="flex sm:flex-row flex-col sm:items-center sm:justify-between gap-[15px] p-[10px] border-b border-gray-200">
                  <div className="flex items-center">
                    <img src={`${imgurl}/${category.imageName}`} alt={category.categoryName} className="w-[50px] h-[50px] rounded-full mr-[10px]" />
                    <div>
                      <h3 className="text-lg font-bold">{category.categoryName}</h3>
                      <p className={`text-sm ${category.comingSoon === "yes" ? "text-red-500" : "text-black"}`}>Coming Soon :  {category.comingSoon} </p>
                    </div>
                  </div>
                  <div className='text-right flex sm:flex-row justify-end'>
                    <button
                      className="bg-blue-500 text-white py-[5px] px-[10px] rounded-[5px] mr-[5px]"
                      onClick={() => openUpdateModal(category)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white py-[5px] px-[10px] rounded-[5px]"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <ReactPaginate
                pageCount={Math.ceil(categories.length / categoriesPerPage)}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Category;
