import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: apiUrl,
});

export const getPosts = async () => {
    try {
      const response = await api.get('/products'); // Endpoint GET data
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

export const getCategories = async () => {
    try {
      const response = await api.get('/categories'); // Endpoint GET data
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

export const postProduct = async (data) => {
    try {
      const response = await api.post('/products', data); // Endpoint POST data
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

export const getPostsbyId = async (id) => {
    try {
      const response = await api.get(`/products/${id}`); // Endpoint GET data
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

export default api;