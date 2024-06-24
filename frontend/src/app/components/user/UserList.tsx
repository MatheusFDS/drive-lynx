import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../services/UserService';
import UserItem from './UserItem';
import { User } from '../../types/user';

export default function UserList() {
  const { data: users, error, isLoading } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <div>
      {users?.map((user) => (
        <UserItem key={user.id ?? 'unknown'} user={user} /> // Use '??' para lidar com undefined
      ))}
    </div>
  );
}
