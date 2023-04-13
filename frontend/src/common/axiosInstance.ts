import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://api.escuelajs.co/api/v1/"
    baseURL: "https://localhost:5001/api/v1/"
})

axiosInstance.interceptors.request.use(
    function (config) {
      // Get the token from local storage
      const token = JSON.parse(localStorage.getItem('token') ?? '');
      // If a token exists, add an Authorization header with the bearer token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  
export default axiosInstance