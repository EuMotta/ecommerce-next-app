import bcrypt from 'bcryptjs';
export const data = {
  user: [
    {
      image: 'https://example.com/image.jpg',
      name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: bcrypt.hashSync('Test@123'),
      birth_of_date: new Date('1990-01-01'),
      phone_number: '+1 123-456-7890',
    },
  ],
  category: [
    {
      name: 'Category 1',
      description: 'Description for Category 1',
    },
  ],
  sub_category: [
    {
      id: '65b9cb0228578c99f32f1f17',
      name: 'Sub Category 1',
      description: 'Description for Sub Category 1',
    },
    {
      id: '65b9cb0228578c99f32f1f16',
      name: 'Sub Category 2',
      description: 'Description for Sub Category 2',
    },
  ],
};
