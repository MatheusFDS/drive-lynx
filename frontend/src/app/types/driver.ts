export interface Driver {
    id: string;
    tenantId: string;
    name: string;
    licenseNumber: string;
    licenseCategory: string;
    licenseExpiry: string; // Deixamos como string para consistência
    phoneNumber?: string;
    email?: string;
    address?: string;
    createdAt: string;
    updatedAt: string;
  }
  