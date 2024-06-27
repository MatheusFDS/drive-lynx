import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
  });
  
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const getDrivers = async () => {
  const response = await api.get('/drivers');
  return response.data;
};

export const getDriver = async (id: string) => {
  const response = await api.get(`/drivers/${id}`);
  return response.data;
};

export const createDriver = async (driverData: any) => {
  const response = await api.post('/drivers', driverData);
  return response.data;
};

export const updateDriver = async (id: string, driverData: any) => {
  const response = await api.put(`/drivers/${id}`, driverData);
  return response.data;
};

export const deleteDriver = async (id: string) => {
  const response = await api.delete(`/drivers/${id}`);
  return response.data;
};
