import axios from 'axios';

const api = axios.create({
  baseURL: '/api/finances', 
  headers: {
    'Accept': 'application/json'
  }
});

export default api;