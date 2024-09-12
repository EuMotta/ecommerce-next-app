import bcrypt from 'bcryptjs';

export const data = {
  user: [
    {
      _id: '66dcabb3d6921148f63c1b70',
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
      code: 1,
      description:
        'O iPhone 13 é o modelo mais recente da Apple, oferecendo desempenho superior com o chip A15 Bionic e conectividade 5G.',
      image: ['/products/phone.png'],
      weight: 100,
      warranty: 3,
      technicalSpecifications: {
        characteristics:
          'O iPhone 13 combina design elegante com desempenho excepcional e novas tecnologias:',
        specifications: [
          {
            title: 'Tela',
            description: [
              '6.1 polegadas',
              'Super Retina XDR',
              '1170 x 2532 pixels',
              'True Tone e Wide color (P3)',
            ],
          },
          {
            title: 'Processador',
            description: [
              'A15 Bionic',
              '6 núcleos (2 núcleos de alto desempenho e 4 núcleos de eficiência)',
              'Fabricado com tecnologia de 5nm',
            ],
          },
          {
            title: 'Câmera Traseira',
            description: [
              'Câmera principal de 12 MP com abertura f/1.6',
              'Câmera ultra-angular de 12 MP com abertura f/2.4 e campo de visão de 120°',
              'Modo Noturno, Deep Fusion e Smart HDR 4',
            ],
          },
          {
            title: 'Bateria',
            description: [
              'Até 19 horas de reprodução de vídeo',
              'Carregamento rápido com cabo Lightning',
              'Carregamento sem fio MagSafe',
            ],
          },
          {
            title: 'Armazenamento',
            description: [
              '128 GB, 256 GB, ou 512 GB',
              'Sem opção de expansão com cartão microSD',
            ],
          },
          {
            title: 'Conectividade',
            description: ['5G', 'Wi-Fi 6 (802.11ax)', 'Bluetooth 5.0'],
          },
          {
            title: 'Sistema Operacional',
            description: ['iOS 15'],
          },
        ],
      },
      price: 250,
      skus: ['66de35051957e148d7440f22'],
      slug: 'iphone-13-the-new-iphone-13-with-a15-chip.',
      summary: 'The new iPhone 13 with A15 chip.',
      cover: '/products/coverphone.png',
      category: ['66dcc4ab55c8d7a840dbbd64'],
      created_at: new Date(),
    },
  ],
  product_sku: [
    {
      _id: '66de35051957e148d7440f22',
      product: '66dcc5c1d74d8f522ccb8e23',
      size: '66de34921957e148d7440f02',
      color: '66de34921957e148d7440f01',
      sku: 'IP13-BLK-128GB',
      quantity: 50,
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de35051957e148d7440e22',
      product: '66dcc5c1d74d8f522ccb8e23',
      size: '66de34921957e148d7440f02',
      color: '66de34921957e148d7440f01',
      sku: 'IP13-BLK-256GB',
      quantity: 50,
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de35051957e148d7440c22',
      product: '66dcc5c1d74d8f522ccb8e23',
      size: '66de34921957e148d7440f02',
      color: '66de34921957e148d7440f01',
      sku: 'IP13-BLK-512GB',
      quantity: 50,
      created_at: '2024-09-08T00:00:00Z',
    },
  ],
  comment: [
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 4,
      comment:
        'Ótimo produto! A qualidade é excelente e o atendimento ao cliente foi muito bom.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 5,
      comment:
        'Produto excelente! Superou minhas expectativas em todos os aspectos.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 4,
      comment:
        'Muito bom, mas o envio demorou um pouco mais do que eu esperava.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 3,
      comment: 'O produto é bom, mas tive alguns problemas com a instalação.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 5,
      comment:
        'Excelente! Atendeu a todas as minhas necessidades e é de alta qualidade.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 2,
      comment:
        'Infelizmente, o produto chegou com defeito e a experiência não foi boa.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 4,
      comment:
        'Bom produto, mas a embalagem poderia ser melhor para proteger o item.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 5,
      comment:
        'Muito satisfeito com a compra! O produto é exatamente como descrito.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 3,
      comment:
        'O produto é bom, mas a entrega foi lenta e não foi bem comunicada.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 4,
      comment: 'Bom produto, mas o manual poderia ser mais detalhado.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 5,
      comment: 'Produto incrível, com excelente custo-benefício. Recomendo!',
    },
  ],
};
