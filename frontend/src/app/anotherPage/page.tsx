'use client';

import withAuth from '../components/withAuth';

function AnotherPage() {
  return (
    <div>
      <h1>Another Protected Page</h1>
      {/* Conteúdo da página */}
    </div>
  );
}

export default withAuth(AnotherPage);
