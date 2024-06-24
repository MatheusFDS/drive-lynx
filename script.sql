-- Excluir dados existentes
TRUNCATE TABLE "Membership" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Organization" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Integration" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Invitation" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "AuditLog" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "DriverPayment" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Route" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Region" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Vehicle" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Driver" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Customer" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Tenant" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Role" RESTART IDENTITY CASCADE;

-- Inserir dados fictícios nas tabelas do banco de dados

-- Tabela de Roles (Funções)
INSERT INTO "Role" (id, name, description) VALUES
('role-id-101', 'Admin', 'Administrator role'),
('role-id-102', 'User', 'Standard user role'),
('role-id-103', 'Driver', 'Driver role')
ON CONFLICT DO NOTHING;

-- Tabela de Tenants (Inquilinos)
INSERT INTO "Tenant" (id, name, domain, address, "phoneNumber", "createdAt", "updatedAt") VALUES
('tenant-id-101', 'Tenant One', 'tenantone.com', '123 Main St', '123-456-7890', NOW(), NOW()),
('tenant-id-102', 'Tenant Two', 'tenanttwo.com', '456 Elm St', '987-654-3210', NOW(), NOW()),
('tenant-id-103', 'Tenant Three', 'tenantthree.com', '789 Oak St', '456-123-7890', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de Organizations (Organizações)
INSERT INTO "Organization" (id, name, domain, "createdAt", "updatedAt") VALUES
('organization-id-101', 'Organization One', 'organizationone.com', NOW(), NOW()),
('organization-id-102', 'Organization Two', 'organizationtwo.com', NOW(), NOW()),
('organization-id-103', 'Organization Three', 'organizationthree.com', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de Users (Usuários)
INSERT INTO "User" (id, email, password, name, "roleId", "tenantId", "isActive", "createdAt", "updatedAt") VALUES
('user-id-101', 'admin@example.com', '$2b$10$D9QWbbYFtK0yFJjOGuJ76uBxEj1dIAGoVybV7ljMjb0fNYZl2u/K6', 'Admin User', 'role-id-101', 'tenant-id-101', true, NOW(), NOW()),  -- senha: password123
('user-id-102', 'user@example.com', '$2b$10$D9QWbbYFtK0yFJjOGuJ76uBxEj1dIAGoVybV7ljMjb0fNYZl2u/K6', 'Regular User', 'role-id-102', 'tenant-id-102', true, NOW(), NOW()),  -- senha: password123
('user-id-103', 'driver@example.com', '$2b$10$D9QWbbYFtK0yFJjOGuJ76uBxEj1dIAGoVybV7ljMjb0fNYZl2u/K6', 'Driver User', 'role-id-103', 'tenant-id-103', true, NOW(), NOW())  -- senha: password123
ON CONFLICT DO NOTHING;

-- Tabela de Customers (Clientes)
INSERT INTO "Customer" (id, "tenantId", name, email, "phoneNumber", address, "createdAt", "updatedAt") VALUES
('customer-id-101', 'tenant-id-101', 'Customer One', 'customer1@example.com', '555-111-2222', '123 Main St', NOW(), NOW()),
('customer-id-102', 'tenant-id-102', 'Customer Two', 'customer2@example.com', '555-333-4444', '456 Elm St', NOW(), NOW()),
('customer-id-103', 'tenant-id-103', 'Customer Three', 'customer3@example.com', '555-555-6666', '789 Oak St', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de Drivers (Motoristas)
INSERT INTO "Driver" (id, "tenantId", name, "licenseNumber", "licenseCategory", "licenseExpiry", "phoneNumber", email, address, "createdAt", "updatedAt") VALUES
('driver-id-101', 'tenant-id-101', 'John Doe', '123456789', 'B', '2025-12-31', '555-111-2222', 'john.doe@example.com', '123 Main St', NOW(), NOW()),
('driver-id-102', 'tenant-id-102', 'Jane Smith', '987654321', 'C', '2026-11-30', '555-333-4444', 'jane.smith@example.com', '456 Elm St', NOW(), NOW()),
('driver-id-103', 'tenant-id-103', 'Bob Johnson', '555555555', 'D', '2027-10-29', '555-555-6666', 'bob.johnson@example.com', '789 Oak St', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de Vehicles (Veículos)
INSERT INTO "Vehicle" (id, "tenantId", "licensePlate", model, manufacturer, year, capacity, "createdAt", "updatedAt") VALUES
('vehicle-id-101', 'tenant-id-101', 'ABC1234', 'Model X', 'Tesla', 2020, 1000.0, NOW(), NOW()),
('vehicle-id-102', 'tenant-id-102', 'XYZ5678', 'Model S', 'Tesla', 2019, 800.0, NOW(), NOW()),
('vehicle-id-103', 'tenant-id-103', 'LMN9101', 'Model 3', 'Tesla', 2021, 600.0, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de Regions (Regiões)
INSERT INTO "Region" (id, "tenantId", name, "startZip", "endZip", "regionValue", "createdAt", "updatedAt") VALUES
('region-id-101', 'tenant-id-101', 'North Region', '10000000', '19999999', 50.0, NOW(), NOW()),
('region-id-102', 'tenant-id-102', 'South Region', '20000000', '29999999', 60.0, NOW(), NOW()),
('region-id-103', 'tenant-id-103', 'West Region', '30000000', '39999999', 70.0, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de Routes (Rotas)
INSERT INTO "Route" (id, "tenantId", "driverId", "vehicleId", "totalWeight", "totalValue", status, "createdAt", "updatedAt") VALUES
('route-id-101', 'tenant-id-101', 'driver-id-101', 'vehicle-id-101', 500.0, 2000.0, 'Scheduled', NOW(), NOW()),
('route-id-102', 'tenant-id-102', 'driver-id-102', 'vehicle-id-102', 400.0, 1500.0, 'In Progress', NOW(), NOW()),
('route-id-103', 'tenant-id-103', 'driver-id-103', 'vehicle-id-103', 300.0, 1000.0, 'Completed', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de Orders (Pedidos)
INSERT INTO "Order" (id, "tenantId", "customerId", "routeId", status, weight, value, priority, "deliveryAddress", "deliveryCity", "deliveryState", "deliveryZip", "deliveryInstructions", "createdAt", "updatedAt") VALUES
('order-id-101', 'tenant-id-101', 'customer-id-101', 'route-id-101', 'Pending', 100.0, 500.0, 'High', '123 Main St', 'City One', 'State One', '10000000', 'Leave at front door', NOW(), NOW()),
('order-id-102', 'tenant-id-102', 'customer-id-102', 'route-id-102', 'Shipped', 200.0, 1000.0, 'Medium', '456 Elm St', 'City Two', 'State Two', '20000000', 'Ring bell', NOW(), NOW()),
('order-id-103', 'tenant-id-103', 'customer-id-103', 'route-id-103', 'Delivered', 150.0, 750.0, 'Low', '789 Oak St', 'City Three', 'State Three', '30000000', 'Call on arrival', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de DriverPayments (Pagamentos de Motoristas)
INSERT INTO "DriverPayment" (id, "driverId", amount, "paymentDate", "createdAt", "updatedAt") VALUES
('payment-id-101', 'driver-id-101', 1000.0, '2024-01-15', NOW(), NOW()),
('payment-id-102', 'driver-id-102', 1500.0, '2024-02-20', NOW(), NOW()),
('payment-id-103', 'driver-id-103', 2000.0, '2024-03-25', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de AuditLogs (Logs de Auditoria)
INSERT INTO "AuditLog" (id, "userId", action, details, "createdAt") VALUES
('audit-id-101', 'user-id-101', 'CREATE_ORDER', '{"orderId": "order-id-101"}', NOW()),
('audit-id-102', 'user-id-102', 'UPDATE_ORDER', '{"orderId": "order-id-102"}', NOW()),
('audit-id-103', 'user-id-103', 'DELETE_ORDER', '{"orderId": "order-id-103"}', NOW())
ON CONFLICT DO NOTHING;

-- Tabela de Invitations (Convites)
INSERT INTO "Invitation" (id, "tenantId", email, "roleId", "sentAt", "createdAt", "updatedAt") VALUES
('invitation-id-101', 'tenant-id-101', 'invitee1@example.com', 'role-id-101', NOW(), NOW(), NOW()),
('invitation-id-102', 'tenant-id-102', 'invitee2@example.com', 'role-id-102', NOW(), NOW(), NOW()),
('invitation-id-103', 'tenant-id-103', 'invitee3@example.com', 'role-id-103', NOW(), NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de Integrations (Integrações)
INSERT INTO "Integration" (id, "tenantId", provider, "apiKey", settings, "createdAt", "updatedAt") VALUES
('integration-id-101', 'tenant-id-101', 'Provider One', 'api-key-1', '{"configKey": "configValue"}', NOW(), NOW()),
('integration-id-102', 'tenant-id-102', 'Provider Two', 'api-key-2', '{"configKey": "configValue"}', NOW(), NOW()),
('integration-id-103', 'tenant-id-103', 'Provider Three', 'api-key-3', '{"configKey": "configValue"}', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tabela de Memberships (Associações)
INSERT INTO "Membership" (id, "userId", "organizationId", "roleId", "createdAt", "updatedAt") VALUES
('membership-id-101', 'user-id-101', 'organization-id-101', 'role-id-101', NOW(), NOW()),
('membership-id-102', 'user-id-102', 'organization-id-102', 'role-id-102', NOW(), NOW()),
('membership-id-103', 'user-id-103', 'organization-id-103', 'role-id-103', NOW(), NOW())
ON CONFLICT DO NOTHING;
