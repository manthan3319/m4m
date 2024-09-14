import React, { useState, useEffect } from 'react';
import Saidbar from '../Saidbar/Saidbar';
import { addProduct, getCategory, getProduct, deleteProduct } from '../Api/Api';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { imgurl } from '../Credentials/Credentials';
import ReactPaginate from 'react-paginate';

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [Productdata, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5; // Adjust this as needed
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

  const fetchProduct = async () => {
    try {
      const response = await getProduct();
      if (response.data.length >= 1) {
        setProduct(response.data);
      } else {
        setProduct([]); // Set to empty array if no products
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('selectedCategory', selectedCategory);
      formData.append('selectedCategoryId', selectedCategoryId);
      formData.append('price', price);
      formData.append('mrp', mrp);
      formData.append('image', image);

      const result = await addProduct(formData);

      if (result.message === "Product added successfully") {
        toast.success(result.message);
        setModalIsOpen(false);
        fetchProduct();  // Refresh the product list after adding a product
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error("An error occurred while adding the product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deleteProduct(productId);
      if (response.data.messages === "product deleted successfully") {
        toast.success('Product deleted successfully');
        fetchProduct();  // Refresh the product list after deletion
      } else {
        toast.error('Failed to delete product: ' + response.data.messages);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("An error occurred while deleting the product.");
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Productdata.slice(indexOfFirstProduct, indexOfLastProduct);
  // console.log("Productdata",Productdata);
  return (
    <div>
      <Saidbar />
      <div className='sm:ml-[250px] px-[30px] pt-[25px]'>
        <div className='mt-[31px]'>
          <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">Product List</h2>
        </div>
        <div className="text-right">
          <button
            onClick={() => setModalIsOpen(true)}
            className="bg-black py-[15px] px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
          >
            Add Product
          </button>
        </div>

        <div className='mt-[50px]'>
          {Productdata.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <>
              {currentProducts.map((product) => (
                <div key={product.id} className='flex md:flex-row flex-col gap-[15px] items-center justify-between mb-[15px] border-b-[1px] pb-[15px] md:border-none border-[1px] border-black md:p-0 p-[10px] '>
                  <div className='flex lg:flex-row flex-col sm:items-center gap-x-9 gap-y-2 w-[100%]'>
                    <div>
                      <img src={`${imgurl}/${product.imageName}`} alt={product.categoryName} className="w-[70px] h-[70px] rounded-full m-auto" />
                    </div>
                    <div className='flex flex-col md:flex-row  md:gap-16 w-[100%]'>
                      <div className='flex flex-row sm:gap-[20px] gap-[12px]'>
                        <div className='w-[50%] md:w-auto'>
                          <span className='font-roboto md:text-[20px] font-bold text-[15px]'>product Name</span>
                          <p className='text-black font-roboto md:text-[18px] text-[16px]'>{product.productName}</p>
                        </div>
                        <div className='w-[50%] md:w-auto'>
                          <span className='font-roboto md:text-[19px] font-bold text-[15px]'>Category Name</span>
                          <p className='text-black font-roboto md:text-[18px] text-[16px]'>{product.categoryName}</p>
                        </div>
                      </div>

                      <div className='flex sm:flex-row  sm:gap-[20px]  gap-[12px] mt-[10px] md:mt-0 border-t-2 sm:border-none'>
                        <div className='flex flex-row md:flex-col gap-[5px] '>
                          <span className='font-roboto md:text-[20px] font-bold text-[15px]'>Price:</span>
                          <p className='text-black font-roboto md:text-[18px] text-[16px]'>₹{product.price}</p>
                        </div>
                        <div className=' flex flex-row md:flex-col gap-[5px] '>
                          <span className='font-roboto md:text-[20px] font-bold text-[15px]'>MRP:</span>
                          <p className='text-black font-roboto md:text-[18px] text-[16px]'>₹{product.mrp}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              <ReactPaginate
                pageCount={Math.ceil(Productdata.length / productsPerPage)}
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
            </>
          )}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Add Product"
          style={customStyles}
        >
          <h2 className="text-2xl font-bold mb-4 font-roboto">Add Product</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setSelectedCategory(selectedCategory);
                  // Find the ID of the selected category
                  const categoryId = categories.find(category => category.categoryName === selectedCategory)?._id;
                  setSelectedCategoryId(categoryId || '');
                }}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.categoryName} className='text-black outline-none'>
                    {category.categoryName}
                  </option>
                ))}
              </select>

            </div>

            <div className='flex gap-[15px]'>
              <div className="mb-4 w-[50%]">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-[100%] outline-none"
                />
              </div>
              <div className="mb-4 w-[50%]">
                <label className="block text-sm font-medium mb-2">MRP</label>
                <input
                  type="number"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-[100%] outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-300 rounded-lg p-2"
              />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-[100px] h-[100px] object-cover" />}
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-black text-white py-2 px-4 rounded"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Product;
