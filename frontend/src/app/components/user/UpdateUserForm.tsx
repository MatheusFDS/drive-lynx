// components/user/UpdateUserForm.tsx
'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../services/UserService';
import { User } from '../../types/user';

interface UpdateUserFormProps {
  user: User;
  onClose: () => void;
}

export default function UpdateUserForm({ user, onClose }: UpdateUserFormProps) {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState(user.roleId);
  const [tenantId, setTenantId] = useState(user.tenantId);
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation<User, Error, { id: string; user: Partial<User> }>({
    mutationFn: ({ id, user }) => updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({ id: user.id as string, user: { email, name, password, roleId, tenantId } });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Update User</h2>
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
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Role ID</label>
          <input
            type="text"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Tenant ID</label>
          <input
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled={updateUserMutation.isPending}
        >
          {updateUserMutation.isPending ? 'Loading...' : 'Update User'}
        </button>
        {updateUserMutation.isError && <p className="mt-4 text-red-500">Error updating user</p>}
      </form>
    </div>
  );
}
