'use client';

import UserList from '../components/user/UserList';
import withAuth from '../components/withAuth';

const UsersPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Users</h1>
      <UserList />
    </div>
  );
};

export default withAuth(UsersPage);
