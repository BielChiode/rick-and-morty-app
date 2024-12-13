import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 5000,
});

export default apiClient;
