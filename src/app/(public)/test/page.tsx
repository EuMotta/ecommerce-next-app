import { Suspense } from 'react';

import UsersList from './List';

const Page = () => {
  return (
    <Suspense fallback={<div>Carregando</div>}>
      <UsersList />
    </Suspense>
  );
};

export default Page;
