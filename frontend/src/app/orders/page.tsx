'use client';

import withAuth from '../components/withAuth';

function OrdersPage() {
  return (
    <div>
      <h1>Orders</h1>
      {/* Conteúdo de Orders */}
    </div>
  );
}

export default withAuth(OrdersPage);
