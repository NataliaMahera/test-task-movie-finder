import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

instance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: '0bd778e99c9dd0be4a5a446585adfec9',
    language: 'en-US',
  };
  return config;
});

export default instance;