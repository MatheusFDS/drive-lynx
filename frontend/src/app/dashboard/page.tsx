'use client';

import withAuth from '../components/withAuth';

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Conteúdo do dashboard */}
    </div>
  );
}

export default withAuth(DashboardPage);
