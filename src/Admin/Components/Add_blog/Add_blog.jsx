import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Saidbar from '../Saidbar/Saidbar';
import { addBlog, deleteblog, getBlog } from '../Api/Api';
import { imgurl } from '../Credentials/Credentials';

Modal.setAppElement('#root');

const Add_blog = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [blogImage, setBlogImage] = useState(null);
  const [blogCategory, setBlogCategory] = useState('');
  const [blogTitle, setBlogTitle] = useState(''); // New state for blog title
  const [blogContent, setBlogContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [blogdata, setblogdata] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for optimization

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBlogImage(null);
    setBlogCategory('');
    setBlogTitle(''); // Clear blog title on modal close
    setBlogContent('');
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setBlogImage(URL.createObjectURL(file));
  };

  const handleAddBlog = async () => {
    if (!blogCategory || !blogTitle || !blogContent || !selectedFile) {
      toast.error('Please fill all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('Category', blogCategory);
    formData.append('Title', blogTitle);
    formData.append('Content', blogContent);
    formData.append('image', selectedFile);

    try {
      const response = await addBlog(formData);
      if (response.message === 'Blog added successfully') {
        toast.success('Blog added successfully!');
        closeModal();
        await fetchBlog(); // Fetch updated blog list
      } else {
        toast.error('Failed to add blog.');
      }
    } catch (error) {
      toast.error('An error occurred while adding the blog.');
      console.error('Error adding blog:', error);
    }
  };

  const fetchBlog = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBlog();
      if (response.data.length >= 1) {
        setblogdata(response.data);
      } else {
        setblogdata([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (blogId) => {
    try {
      const response = await deleteblog(blogId);
      if (response.data.messages === 'Blog deleted successfully') {
        toast.success('Blog deleted successfully');
        setblogdata((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      } else {
        toast.error('Failed to delete blog: ' + response.data.messages);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('An error occurred while deleting the blog.');
    }
  };


  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  console.log("blogdata", blogdata);

  const customStyles = {
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
    },
  };

  return (
    <div>
      <div>
        <Saidbar />
      </div>
      <div className='ml-[250px] px-[30px] pt-[25px]'>
        <div className='mt-[31px]'>
          <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">Add Blog & Delete
          </h2>
        </div>

        <div className='text-right'>
          <button
            onClick={openModal}
            className="bg-black py-[15px] px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
          >
            Add Blog
          </button>
        </div>

        {/* Blog List Section */}
        <div className="mt-[20px]">
          {loading ? (
            <p>Loading blogs...</p>
          ) : blogdata.length > 0 ? (
            blogdata.map((blog) => (
              <div key={blog._id} className="border-b-[1px] pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={`${imgurl}/${blog.imageName}`}
                      alt={blog.Category}
                      className="w-[100px] h-[100px] object-cover rounded-[8px] mr-[15px]"
                    />
                    <div>
                      <h3 className="font-roboto text-[20px] font-bold">{blog.Title}</h3> {/* Display blog title */}
                      <p className="font-roboto text-[16px]">{formatDate(blog.createDate)}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      </div>

      {/* Blog Upload Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Blog"
        style={customStyles}
      >
        <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">Add Blog</h2>

        <div className="mb-4">
          <label className="block mb-2 font-roboto text-[18px]">Blog Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4"
          />
          {blogImage && (
            <img src={blogImage} alt="Blog Preview" className="w-[150px] m-auto h-[150px] object-cover rounded-[8px]" />
          )}
        </div>

        {/* Blog Title Input */}
        <div className="mb-4">
          <label className="block mb-2 font-roboto text-[18px]">Blog Title</label>
          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            className="w-full p-2 border rounded outline-none border-black"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-roboto text-[18px]">Blog Category</label>
          <input
            type="text"
            value={blogCategory}
            onChange={(e) => setBlogCategory(e.target.value)}
            className="w-full p-2 border rounded outline-none border-black"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-roboto text-[18px]">Blog Content</label>
          <textarea
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            className="w-full p-2 border rounded outline-none border-black"
            rows="4"
          />
        </div>

        <div className="flex justify-end gap-[10px] mt-4">
          <button
            onClick={closeModal}
            className="bg-black py-[15px] hover:bg-gray-600 px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
          >
            Cancel
          </button>
          <button
            onClick={handleAddBlog}
            className="bg-black py-[15px] px-[25px] hover:bg-gray-600 text-white font-roboto rounded-[25px] font-bold text-[18px]"
          >
            Save
          </button>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Add_blog;
