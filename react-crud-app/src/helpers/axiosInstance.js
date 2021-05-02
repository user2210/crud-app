import axios from 'axios';

const axiosConfig = {
    baseURL: 'https://jsonplaceholder.typicode.com'
};

const api = axios.create(axiosConfig);

export default api;