import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6006',
});

export default api;
