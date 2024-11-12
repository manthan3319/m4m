// src/api/api.jsx
import axios from 'axios';
import { ApiBaseurl } from '../Credentials/Credentials';


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


export const getCategory = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getCategory`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


export const getProduct = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getProduct`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


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


export const getOurCulture = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getOurCulture`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


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


export const getBlog = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getBlog`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


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


export const getDetails = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getDetails`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


export const getAboutus = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getAboutus`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


export const UpdateAboutUs = async () => {
  
};

export const addChatBoxQue = async (question, answers) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/contractor/addChatBoxQue`, {
      question: question,
      answers:answers
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const getChatBoxQue = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getChatBoxQueList`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const deleteChatboxQuestion = async (id) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/chatBoxQuestionDelete`, {
      chatboxId: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const addShopLocation = async (formData) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/AddShopLocation`, formData, {
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

export const getShopLocation = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getShopLocationList`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const deleteShopLocation = async (id) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/deleteShopLocation`, {
      shopid: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const updateShopLocation = async (formData) => {
  try {
      const response = await axios.post(`${ApiBaseurl}/Contractor/updateShopLocation`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error updating shop location:', error);
      throw error;
  }
};


export const updateAboutUs = async (formData) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/updateAboutUs`, formData, {
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

export const updateContact = async (editData) => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/updateContact`, editData, {
      headers: {
        'Content-Type': 'application/json',  
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;  
  }
};


export const getContactDetails = async () => {
  try {
    const response = await axios.post(`${ApiBaseurl}/Contractor/getContactDetails`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

