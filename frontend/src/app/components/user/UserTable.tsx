'use client';  

import { User } from '../../types/user';
interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Nome</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Papel</th>
          <th className="py-2 px-4 border-b">Tenant</th>
          <th className="py-2 px-4 border-b">Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td className="py-2 px-4 border-b">{user.name}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.roleId}</td>
            <td className="py-2 px-4 border-b">{user.tenantId}</td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => onEdit(user)}
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}