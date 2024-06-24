'use client';

import { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/LoginService';

interface User {
  email: string;
  password: string;
}

interface LoginResponse {
  user: { email: string; roleId: string; tenantId: string };
  token: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const loginMutation = useMutation<LoginResponse, Error, User>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Token:', data.token); // Exibe o token no console
      login(data.user, data.token);
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Login falhou', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Loading...' : 'Login'}
          </button>
        </form>
        {loginMutation.isError && <p className="mt-4 text-red-500">Login falhou</p>}
      </div>
    </div>
  );
}
