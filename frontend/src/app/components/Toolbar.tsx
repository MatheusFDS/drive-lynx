'use client';

import { useAuth } from './AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Toolbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/users" className="hover:underline">
          Users
        </Link>
        {/* Adicione outros links conforme necessário */}
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Toolbar;
