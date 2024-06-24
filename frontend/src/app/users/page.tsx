'use client';  

import { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from '../services/UserService';
import UserTable from '../components/user/UserTable';
import UserModal from '../components/user/userModal';
import { User } from '../types/user';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSaveUser = async (user: Partial<User>) => {
    if (selectedUser) {
      const updatedUser = await updateUser(selectedUser.id, user);
      setUsers(users.map(u => (u.id === selectedUser.id ? updatedUser : u)));
    } else {
      const newUser = await addUser(user);
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Adicionar Usuário
        </button>
      </header>
      <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
