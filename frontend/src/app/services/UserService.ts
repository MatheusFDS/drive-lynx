    import axios from 'axios';
    import { User } from '../types/user'; // Importe a interface User

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

    export const fetchUsers = async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
    };

    export const addUser = async (user: Partial<User>): Promise<User> => {
    const response = await api.post('/users', user);
    return response.data;
    };

    export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
    };

    export const deleteUser = async (id: string): Promise<void> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
    };
