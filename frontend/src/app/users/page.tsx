'use client';  
'use client';  

import UserList from '../components/user/UserList';
import withAuth from '../components/withAuth';

const UsersPage = () => {
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
};

export default withAuth(UsersPage);
