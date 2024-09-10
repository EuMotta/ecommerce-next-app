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
      _id: '66de34921957e148d7440f01',
      type: 'Cor',
      value: 'Black',
      created_at: new Date(),
    },
    {
      _id: '66de34921957e148d7440f02',
      type: 'Tamanho',
      value: '128GB',
      created_at: new Date(),
    },
  ],
  product: [
    {
      _id: '66dcc5c1d74d8f522ccb8e23',
      name: 'iPhone 13',
      number: 1,
      description: 'Latest iPhone with 5G technology.',
      image: ['/products/phone.png'],
      weight: 100,
      warranty: 3,
      skus: ['66de35051957e148d7440f22'],
      slug: 'iphone-13-the-new-iphone-13-with-a15-chip.',
      summary: 'The new iPhone 13 with A15 chip.',
      cover: '/products/coverphone.png',
      category: '66dcc4ab55c8d7a840dbbd64',
      created_at: new Date(),
    },
  ],
  product_sku: [
    {
      _id: '66de35051957e148d7440f22',
      product: '66dcc5c1d74d8f522ccb8e23',
      size: '66de34921957e148d7440f02',
      color: '66de34921957e148d7440f01',
      price: 250,
      sku: 'IP13-BLK-128GB',
      quantity: 50,
      created_at: '2024-09-08T00:00:00Z',
      technicalSpecifications: {
        characteristics: 'Exemplo de características do produto',
        specifications: [
          {
            title: 'Tela',
            description: ['6.1 polegadas', 'Super Retina XDR'],
          },
          {
            title: 'Processador',
            description: ['A15 Bionic', '6 núcleos'],
          },
        ],
      },
    },
  ],
};
