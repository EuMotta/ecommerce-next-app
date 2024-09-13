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
      name: 'Electronicos',
      description: 'Various electronic devices and gadgets.',
      created_at: new Date(),
    },
    {
      _id: '66dcc4ab55c8d7a840dbbd67',
      name: 'Tenis',
      description:
        'Clothing and footwear designed for sports and physical activities.',
      created_at: new Date(),
    },
    {
      _id: '66dcc4ab55c8d7a840dbbd66',
      name: 'Residencial',
      description:
        'Appliances for home use, including refrigerators, washing machines, and more.',
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
      _id: '66dcc4ff55c8d7a840dbbd72',
      parent_id: '66dcc4ab55c8d7a840dbbd67',
      name: 'Tênis de Corrida',
      description: 'Footwear specifically designed for running and jogging.',
      created_at: new Date(),
    },
    {
      _id: '66dcc4ff55c8d7a840dbbd71',
      parent_id: '66dcc4ab55c8d7a840dbbd66',
      name: 'Refrigeradores',
      description:
        'Various types of refrigerators including top-freezer, bottom-freezer, and side-by-side models.',
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
      _id: '66de34921957e148d744ef07',
      type: 'Cor',
      value: 'Inox',
      created_at: new Date(),
    },
    {
      _id: '66de34921957e148d7440f08',
      type: 'Tamanho',
      value: '500L',
      created_at: new Date(),
    },
    {
      _id: '66de34921957e148d7440f09',
      type: 'Cor',
      value: 'Preto com Azul',
      created_at: new Date(),
    },
    {
      _id: '66de34921957e148d7440f10',
      type: 'Tamanho',
      value: '42',
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
      sub_category: ['66dcc4ff55c8d7a840dbbd6e'],
      category: '66dcc4ff55c8d7a840dbbd6e',
      created_at: new Date(),
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e24',
      name: 'Geladeira Frost Free',
      code: 2,
      description:
        'A Geladeira Frost Free é ideal para quem busca praticidade e eficiência energética. Com tecnologia de resfriamento uniforme e design moderno, é perfeita para qualquer cozinha.',
      image: ['/products/fridge.png'],
      weight: 75000,
      warranty: 5,
      technicalSpecifications: {
        characteristics:
          'Geladeira com tecnologia Frost Free e eficiência energética avançada.',
        specifications: [
          {
            title: 'Capacidade Total',
            description: ['500 litros'],
          },
          {
            title: 'Tipo de Refrigeração',
            description: ['Frost Free'],
          },
          {
            title: 'Consumo de Energia',
            description: ['Classe A++'],
          },
          {
            title: 'Número de Portas',
            description: ['2 portas'],
          },
          {
            title: 'Recursos Adicionais',
            description: ['Dispensador de água', 'Prateleiras ajustáveis'],
          },
        ],
      },
      price: 1200,
      skus: ['66de35051957e148d7440f23'],
      slug: 'geladeira-frost-free-com-tecnologia-avancada',
      summary:
        'Geladeira Frost Free com capacidade de 500 litros e eficiência energética A++.',
      cover: '/products/coverfridge.png',
      sub_category: ['66dcc4ff55c8d7a840dbbd71'],
      category: '66dcc4ab55c8d7a840dbbd66',
      created_at: new Date(),
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e25',
      name: 'Tênis de Corrida Ultraleve',
      code: 3,
      description:
        'O Tênis de Corrida Ultraleve é ideal para corredores que buscam conforto e desempenho. Com tecnologia de amortecimento avançada e design aerodinâmico, é a escolha perfeita para treinos e competições.',
      image: ['/products/running_shoes.png'],
      weight: 250,
      warranty: 3,
      technicalSpecifications: {
        characteristics:
          'Tênis projetado para alta performance em corridas, com foco em leveza e conforto.',
        specifications: [
          {
            title: 'Material',
            description: ['Malha respirável', 'Solado em borracha'],
          },
          {
            title: 'Amortecimento',
            description: ['Tecnologia de amortecimento em gel'],
          },
          {
            title: 'Peso',
            description: ['250 gramas por pé'],
          },
          {
            title: 'Tamanhos Disponíveis',
            description: ['36 a 44'],
          },
          {
            title: 'Cor',
            description: ['Preto com detalhes em azul'],
          },
        ],
      },
      price: 150,
      skus: ['66de35051957e148d7440f24'],
      slug: 'tenis-de-corrida-ultraleve-com-amortecimento',
      summary:
        'Tênis de Corrida Ultraleve com tecnologia de amortecimento e material respirável.',
      cover: '/products/coverrunning_shoes.png',
      sub_category: ['66dcc4ff55c8d7a840dbbd72'],
      category: '66dcc4ab55c8d7a840dbbd67',
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
      _id: '66de35051957e148d7440f23',
      product: '66dcc5c1d74d8f522ccb8e24',
      size: '66de34921957e148d7440f08',
      color: '66de34921957e148d744ef07',
      sku: 'FRIDGE-500L-A++',
      quantity: 30,
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de35051957e148d7440f24',
      product: '66dcc5c1d74d8f522ccb8e25',
      size: '66de34921957e148d7440f10',
      color: '66de34921957e148d7440f09',
      sku: 'RUNSHOE-250G-BLUE',
      quantity: 75,
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
