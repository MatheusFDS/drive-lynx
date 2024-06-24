import axios from 'axios';
import { LoginResponse } from '../types/user'; // Importe a interface LoginResponse

export const loginUser = async (user: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>('http://localhost:3001/auth/login', user);
  return response.data;
};
