export interface JwtPayload {
  sub: string;
  username: string;
  roleId: string; // Adicione roleId
  tenantId: string; // Adicione tenantId
}
