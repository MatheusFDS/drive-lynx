// types/user.ts
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  roleId: string;
  tenantId: string;
  isActive: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tenant {
  id: string;
  name: string;
  // Adicione outras propriedades relevantes aqui
}

export enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  User = 'User',
}

export interface LoginResponse {
  user: {
    email: string;
    roleId: string;
    tenantId: string;
  };
  token: string;
}
