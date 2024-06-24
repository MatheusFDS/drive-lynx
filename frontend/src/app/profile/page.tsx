'use client';

import withAuth from '../components/withAuth';

function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
      {/* Conteúdo do perfil */}
    </div>
  );
}

export default withAuth(ProfilePage);
