// src/api/api.jsx
import axios from 'axios';
import { ApiBaseurl } from '../Credentials/Credentials';

// Function to add a category
export const addCategory = async (categoryName, image, comingSoon) => {
  const formData = new FormData();
  formData.append('categoryName', categoryName);
  formData.append('comingSoon', comingSoon ? 'yes' : 'no');
  formData.append('image', image);

  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/AddCategory`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

// Function to fetch categories
export const getCategory = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getCategory`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Function to fetch getProduct
export const getProduct = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getProduct`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Function to delete a category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/categoryDelete`, {
      categoryId: categoryId,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Function to delete a category
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/productDelete`, {
      productId: productId,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const updateCategory = async (categoryId, categoryName, image, comingSoon) => {
  const formData = new FormData();
  formData.append('categoryId', categoryId);
  formData.append('categoryName', categoryName);
  formData.append('comingSoon', comingSoon ? 'yes' : 'no');
  if (image) {
    formData.append('image', image);
  }

  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/updateCategory`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Function to add a product
export const addProduct = async (formData) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/AddProduct`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Function to add images to our culture
export const addOurCulture = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/AddOurCulture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding our culture:', error);
    throw error;
  }
};

// Function to fetch out cilture
export const getOurCulture = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getOurCulture`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Function to delete a Our Culture
export const deleteOurCulture = async (ourCultureId) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/ourCultureDelete`, {
      ourCultureId: ourCultureId,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Function to add a blog
export const addBlog = async (formData) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/AddBlog`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

// Function to fetch getProduct
export const getBlog = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getBlog`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Function to delete a category
export const deleteblog = async (blogId) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/blogDelete`, {
      blogId: blogId,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const AddAboutUs = async (formData) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/AddAboutUs`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

// Function to fetch homeDetails
export const getDetails = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getDetails`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Function to fetch homeDetails
export const getAboutus = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getAboutus`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Function to fetch homeDetails
export const UpdateAboutUs = async () => {
  
};