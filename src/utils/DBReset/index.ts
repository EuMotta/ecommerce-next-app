import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

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
      _id: '66dcc4ab55c8d7a840dbbd64',
      name: 'Electronics',
      description: 'Various electronic devices and gadgets.',
      created_at: new Date(),
    },
  ],
  sub_category: [
    {
      _id: '66dcc4ff55c8d7a840dbbd6e',
      parent_id: '66dcc4ab55c8d7a840dbbd64',
      name: 'Smartphones',
      description: 'Latest models of smartphones.',
      created_at: new Date(),
    },
    {
      _id: '66dcc4ff55c8d7a840dbbd6f',
      parent_id: '66dcc4ab55c8d7a840dbbd64',
      name: 'Laptops',
      description: 'Wide range of laptops.',
      created_at: new Date(),
    },
  ],
  product_attribute: [
    {
      _id: new mongoose.Types.ObjectId(),
      type: 'color',
      value: 'Black',
      created_at: new Date(),
    },
    {
      _id: new mongoose.Types.ObjectId(),
      type: 'size',
      value: '128GB',
      created_at: new Date(),
    },
  ],
  product: [
    {
      _id: '66dcc5c1d74d8f522ccb8e23',
      name: 'iPhone 13',
      description: 'Latest iPhone with 5G technology.',
      price: 250,
      image: ['/products/phone.png'],
      slug: 'iphone-13-the-new-iphone-13-with-a15-chip.',
      summary: 'The new iPhone 13 with A15 chip.',
      cover: '/products/coverphone.png',
      category: '66dcc4ab55c8d7a840dbbd64',
      created_at: new Date(),
    },
  ],
  product_sku: [
    {
      _id: new mongoose.Types.ObjectId(),
      product: '66dcc5c1d74d8f522ccb8e23',
      size_attribute: '',
      color_attribute: '',
      sku: 'IP13-BLK-128GB',
      price: 999.99,
      quantity: 50,
      created_at: new Date(),
    },
  ],
};
