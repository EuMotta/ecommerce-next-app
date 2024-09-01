import React from 'react';

import { HTTPClientFactory } from '@/adapters/axios-adapter';

import { getData } from './resource';

type User = {
  id: number;
  name: string;
  email: string;
  title: string;
};

const UsersList: React.FC = async () => {
  const httpClient = HTTPClientFactory();
  const userList = getData(httpClient);
  const { data, status, error } = await userList.loadAll(
    'https://jsonplaceholder.typicode.com/photos',
  );
  if (error) {
    return (
      <div>
        {status} {error}
      </div>
    );
  }
  return (
    <ul>
      {data.map((user: User, index: number) => (
        <li key={index}>{user.title}</li>
      ))}
    </ul>
  );
};

export default UsersList;
