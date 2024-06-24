import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Crie roles se ainda não existirem
  await prisma.role.upsert({
    where: { id: 'role-id-104' },
    update: {},
    create: {
      id: 'role-id-104',
      name: 'SuperAdmin',
      description: 'Super Administrator role',
    },
  });

  // Certifique-se de que o tenant existe
  await prisma.tenant.upsert({
    where: { id: 'tenant-id-101' },
    update: {},
    create: {
      id: 'tenant-id-101',
      name: 'Tenant One',
      domain: 'tenantone.com',
      address: '123 Main St',
      phoneNumber: '123-456-7890',
    },
  });

  // Crie o super admin
  const hashedPassword = await bcrypt.hash('superadminpassword', 10);

  await prisma.user.upsert({
    where: { email: 'superadmin@example.com' },
    update: {},
    create: {
      email: 'superadmin@example.com',
      password: hashedPassword,
      name: 'Super Admin',
      roleId: 'role-id-104',
      tenantId: 'tenant-id-101',
    },
  });

  console.log('SuperAdmin created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
