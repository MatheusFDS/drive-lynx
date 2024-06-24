import { useState } from 'react';
import { User } from '../../types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../services/UserService';
import UpdateUserForm from './UpdateUserForm';

interface UserItemProps {
  user: User;
}

export default function UserItem({ user }: UserItemProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const deleteUserMutation = useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleDelete = () => {
    deleteUserMutation.mutate(user.id ?? ''); // Use '??' para lidar com undefined
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="p-4 border rounded mb-2">
      {isEditing ? (
        <UpdateUserForm user={user} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <h3 className="text-xl">{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.roleId}</p> {/* Adicione o campo de role */}
          <p>{user.tenantId}</p> {/* Adicione o campo de tenant */}
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
            disabled={deleteUserMutation.isPending}
          >
            {deleteUserMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
          {deleteUserMutation.isError && <p className="text-red-500">Error deleting user</p>}
        </>
      )}
    </div>
  );
}
