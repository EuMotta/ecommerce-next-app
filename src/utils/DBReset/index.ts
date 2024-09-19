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
      name: 'eletronicos',
      description: 'Various electronic devices and gadgets.',
      created_at: new Date(),
    },
    {
      _id: '66dcc4ab55c8d7a840dbbd67',
      name: 'tenis',
      description:
        'Clothing and footwear designed for sports and physical activities.',
      created_at: new Date(),
    },
    {
      _id: '66dcc4ab55c8d7a840dbbd66',
      name: 'residencial',
      description:
        'Appliances for home use, including refrigerators, washing machines, and more.',
      created_at: new Date(),
    },
  ],
  sub_category: [
    {
      _id: '66dcc4ff55c8d7a840dbbd6e',
      parent_id: '66dcc4ab55c8d7a840dbbd64',
      name: 'smartphones',
      description: 'Latest models of smartphones.',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc4ff55c8d7a840dbbd72',
      parent_id: '66dcc4ab55c8d7a840dbbd67',
      name: 'tenis-de-corrida',
      description:
        'Footwear specifically designed for running and jogging on hard surfaces.',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc4ff55c8d7a840dbbd73',
      parent_id: '66dcc4ab55c8d7a840dbbd67',
      name: 'tenis-confortável',
      description: 'Footwear designed for comfort and everyday use.',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc4ff55c8d7a840dbbd71',
      parent_id: '66dcc4ab55c8d7a840dbbd66',
      name: 'refrigeradores',
      description:
        'Various types of refrigerators including top-freezer, bottom-freezer, and side-by-side models.',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc4ff55c8d7a840dbbd74',
      parent_id: '66dcc4ab55c8d7a840dbbd66',
      name: 'maquinas-de-lavar',
      description:
        'Various types of washing machines including front-load and top-load models.',
      created_at: '2024-09-13T00:00:00Z',
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
      slug: 'iphone-114-the-new-iphone-13-with-a15-chip',
      summary: 'The new iPhone 13 with A15 chip.',
      cover: '/products/coverphone.png',
      company: '66e6397153330e3d00249927',
      sub_category: '66dcc4ff55c8d7a840dbbd6e',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e22',
      name: 'Celular Paramount Vision X Pro, Helio AX3D, 9GB RAM, 257GB, Tela OLED 7.4" 90Hz, Câmera 64MP, Bateria 4500mAh, 5G - ATFXP-BK',
      code: 8,
      description:
        'O iPhone 12 é o modelo mais recente da Apple, oferecendo desempenho superior com o chip A15 Bionic e conectividade 5G.',
      image: ['/products/phone/1.jpeg'],
      weight: 100,
      warranty: 3,
      company: '66e6397153330e3d00249927',
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
      slug: 'iphone-13-the-new-iphone-13-with-a15-chip',
      summary: 'The new iPhone 13 with A15 chip.',
      cover: '/products/coverphone.png',
      sub_category: '66dcc4ff55c8d7a840dbbd6e',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e21',
      name: 'Celular AlphaTech Fusion X Pro, Helio G99, 8GB RAM, 128GB, Tela OLED 6.4" 90Hz, Câmera 64MP, Bateria 4500mAh, 5G - ATFXP-BK',
      code: 9,
      description:
        'O iPhone 12 é o modelo mais recente da Apple, oferecendo desempenho superior com o chip A15 Bionic e conectividade 5G.',
      image: ['/products/phone/2.jpeg'],
      weight: 100,
      warranty: 3,
      company: '66e6397153330e3d00249927',
      technicalSpecifications: {
        characteristics:
          'O iPhone 10 combina design elegante com desempenho excepcional e novas tecnologias:',
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
      slug: 'iphone-111-the-new-iphone-13-with-a15-chip',
      summary: 'The new iPhone 13 with A15 chip.',
      cover: '/products/coverphone.png',
      sub_category: '66dcc4ff55c8d7a840dbbd6e',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e20',
      name: 'Smartphone ZenPhone Blaze X9, Snapdragon 8 Gen 2, 12GB RAM, 256GB, Tela AMOLED 6.7" 120Hz, Câmera 108MP, Bateria 5000mAh, Dual SIM - ZBX9-BL',
      code: 10,
      description:
        'O iPhone 17 é o modelo mais recente da Apple, oferecendo desempenho superior com o chip A15 Bionic e conectividade 5G.',
      image: ['/products/phone/3.jpeg'],
      weight: 100,
      warranty: 3,
      technicalSpecifications: {
        characteristics:
          'O iPhone 10 combina design elegante com desempenho excepcional e novas tecnologias:',
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
      slug: 'iphone-112-the-new-iphone-13-with-a15-chip',
      summary: 'The new iPhone 13 with A15 chip.',
      company: '66e6397153330e3d00249928',
      cover: '/products/coverphone.png',
      sub_category: '66dcc4ff55c8d7a840dbbd6e',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e24',
      name: 'Geladeira Smart Frostbite Tech 520L, Frost Free, Inverter, Wi-Fi integrado, Controle de temperatura digital, Compartimento Turbo Freeze - FG520-SI-BL',
      company: '66e6397153330e3d00249928',
      code: 21,
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
      sub_category: '66dcc4ff55c8d7a840dbbd71',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e11',
      name: 'Cadeira Gamer Thunderx Fury Red XG-400, couro sintético, ajuste de altura, encosto reclinável até 180°, apoio para pés retrátil, LED RGB - CGTX-400-BK-R',
      company: '66e6397153330e3d00249928',
      code: 2,
      description:
        'A Geladeira Frost Free é ideal para quem busca praticidade e eficiência energética. Com tecnologia de resfriamento uniforme e design moderno, é perfeita para qualquer cozinha.',
      image: ['/products/residential/1.jpeg'],
      weight: 75000,
      warranty: 5,
      technicalSpecifications: {
        characteristics:
          'Cadeira com tecnologia Frost Free e eficiência energética avançada.',
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
      slug: 'cadeira-frost-free-com-tecnologia-avancada',
      summary:
        'Geladeira Frost Free com capacidade de 500 litros e eficiência energética A++.',
      cover: '/products/coverfridge.png',
      sub_category: '66dcc4ff55c8d7a840dbbd71',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e19',
      name: 'Tênis Esportivo Runmaster Speed X1, Amortecimento ProFoam, Solado FlexGrip, Respirável, Ultra leve, Palmilha MemoryTech - RSX1-BL-RD',
      company: '66e6397153330e3d00249928',
      code: 3,
      description:
        'O Tênis de Corrida Ultraleve é ideal para corredores que buscam conforto e desempenho. Com tecnologia de amortecimento avançada e design aerodinâmico, é a escolha perfeita para treinos e competições.',
      image: ['/products/shoes/1.jpeg'],
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
      sub_category: '66dcc4ff55c8d7a840dbbd72',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e26',
      name: 'Tênis Urbano AeroSpeed 350, Design Slim, Palmilha de Gel, Antiderrapante, Respirável, Tecido FlexForm - AS350-BK',
      company: '66e6397153330e3d00249928',
      code: 4,
      description:
        'O Tênis Casual Elegante combina estilo e conforto para uso diário. Ideal para quem busca um look moderno sem abrir mão do conforto.',
      image: ['/products/shoes/2.jpeg'],
      weight: 300,
      warranty: 3,
      technicalSpecifications: {
        characteristics:
          'Tênis casual projetado para o dia a dia, com design moderno e conforto prolongado.',
        specifications: [
          {
            title: 'Material',
            description: ['Couro sintético', 'Solado em EVA'],
          },
          {
            title: 'Amortecimento',
            description: ['Espuma EVA'],
          },
          {
            title: 'Peso',
            description: ['300 gramas por pé'],
          },
          {
            title: 'Tamanhos Disponíveis',
            description: ['35 a 43'],
          },
          {
            title: 'Cor',
            description: ['Cinza com detalhes em branco'],
          },
        ],
      },
      price: 120,
      skus: ['66de35051957e148d7440f25', '66de35051957e148d7440f2a'],
      slug: 'tenis-casual-elegante-para-o-dia-a-dia',
      summary: 'Tênis Casual Elegante com design moderno e conforto diário.',
      cover: '/products/covercasual_shoes.png',
      sub_category: '66dcc4ff55c8d7a840dbbd73',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e27',
      name: 'Tênis Trailrunner Pro XT6, Solado ExtremeGrip, Impermeável, Reforço lateral, Palmilha anatômica, Sistema de ventilação - TRPXT6-GR',
      company: '66e6397153330e3d00249928',
      code: 5,
      description:
        'O Tênis de Corrida para Trilhas oferece tração e suporte em terrenos acidentados, ideal para aventuras ao ar livre.',
      image: ['/products/shoes/3.jpeg'],
      weight: 350,
      warranty: 3,
      technicalSpecifications: {
        characteristics:
          'Tênis robusto e durável, projetado para corridas em trilhas e terrenos acidentados.',
        specifications: [
          {
            title: 'Material',
            description: ['Malha resistente', 'Solado com cravos'],
          },
          {
            title: 'Amortecimento',
            description: ['Tecnologia de amortecimento em espuma'],
          },
          {
            title: 'Peso',
            description: ['350 gramas por pé'],
          },
          {
            title: 'Tamanhos Disponíveis',
            description: ['37 a 45'],
          },
          {
            title: 'Cor',
            description: ['Verde com detalhes em laranja'],
          },
        ],
      },
      price: 180,
      skus: ['66de35051957e148d7440f26'],
      slug: 'tenis-de-corrida-para-trilhas-com-tracao',
      summary:
        'Tênis de Corrida para Trilhas com tração avançada e suporte em terrenos acidentados.',
      cover: '/products/covertrail_running_shoes.png',
      sub_category: '66dcc4ff55c8d7a840dbbd72',
      created_at: '2024-09-13T00:00:00Z',
    },
    {
      _id: '66dcc5c1d74d8f522ccb8e28',
      name: 'Tênis Casual Strider Comfort Pro X500, Tecnologia CloudStep, Antiderrapante, Material sintético premium, Design ergonômico - SCPX500-WH',
      company: '66e6397153330e3d00249928',
      code: 6,
      description:
        'O Tênis de Corrida para Asfalto é ideal para corredores urbanos, oferecendo conforto e suporte em superfícies duras.',
      image: ['/products/shoes/4.jpeg'],
      weight: 275,
      warranty: 3,
      technicalSpecifications: {
        characteristics:
          'Tênis otimizado para corridas em asfalto, com amortecimento e suporte adequados.',
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
            description: ['275 gramas por pé'],
          },
          {
            title: 'Tamanhos Disponíveis',
            description: ['36 a 44'],
          },
          {
            title: 'Cor',
            description: ['Azul com detalhes em branco'],
          },
        ],
      },
      price: 160,
      skus: [
        '66de35051957e148d7440f27',
        '66de35051957e148d7440f28',
        '66de35051957e148d7440f29',
      ],
      slug: 'tenis-de-corrida-para-asfalto-com-amortecimento',
      summary:
        'Tênis de Corrida para Asfalto com amortecimento e material respirável.',
      cover: '/products/coverasphalt_running_shoes.png',
      sub_category: '66dcc4ff55c8d7a840dbbd72',
      created_at: '2024-09-13T00:00:00Z',
    },
  ],
  product_attribute: [
    {
      _id: '66de34921957e148d7440f01',
      type: 'cor',
      value: 'Black',
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de34921957e148d7440f02',
      type: 'tamanho',
      value: '128GB',
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de34921957e148d7440f03',
      type: 'cor',
      value: 'Stainless Steel',
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de34921957e148d7440f04',
      type: 'tamanho',
      value: '500L',
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de34921957e148d7440f05',
      type: 'cor',
      value: 'Green with Orange',
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de34921957e148d7440f06',
      type: 'tamanho',
      value: '37',
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de34921957e148d7440f07',
      type: 'cor',
      value: 'Red',
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de34921957e148d7440f08',
      type: 'tamanho',
      value: '36',
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de34921957e148d7440f09',
      type: 'cor',
      value: 'Blue with White',
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de34921957e148d7440f10',
      type: 'tamanho',
      value: '44',
      created_at: '2024-09-08T00:00:00Z',
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
      product: '66dcc5c1d74d8f522ccb8e23',
      size: '66de34921957e148d7440f02',
      color: '66de34921957e148d7440f01',
      sku: 'IP13-BLK-256GB',
      quantity: 30,
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de35051957e148d7440f24',
      product: '66dcc5c1d74d8f522ccb8e24',
      size: '66de34921957e148d7440f04',
      color: '66de34921957e148d7440f03',
      sku: 'FRD500-SS',
      quantity: 20,
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de35051957e148d7440f25',
      product: '66dcc5c1d74d8f522ccb8e24',
      size: '66de34921957e148d7440f04',
      color: '66de34921957e148d7440f03',
      sku: 'FRD500-BK',
      quantity: 15,
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de35051957e148d7440f26',
      product: '66dcc5c1d74d8f522ccb8e25',
      size: '66de34921957e148d7440f06',
      color: '66de34921957e148d7440f05',
      sku: 'TRS-UCL-36',
      quantity: 40,
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de35051957e148d7440f27',
      product: '66dcc5c1d74d8f522ccb8e25',
      size: '66de34921957e148d7440f06',
      color: '66de34921957e148d7440f05',
      sku: 'TRS-UCL-44',
      quantity: 25,
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de35051957e148d7440f28',
      product: '66dcc5c1d74d8f522ccb8e26',
      size: '66de34921957e148d7440f08',
      color: '66de34921957e148d7440f07',
      sku: 'CSH-ELE-35',
      quantity: 35,
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de35051957e148d7440f29',
      product: '66dcc5c1d74d8f522ccb8e26',
      size: '66de34921957e148d7440f08',
      color: '66de34921957e148d7440f07',
      sku: 'CSH-ELE-43',
      quantity: 22,
      created_at: '2024-09-08T00:00:00Z',
    },
    {
      _id: '66de35051957e148d7440f2a',
      product: '66dcc5c1d74d8f522ccb8e27',
      size: '66de34921957e148d7440f10',
      color: '66de34921957e148d7440f09',
      sku: 'TRS-TLR-37',
      quantity: 28,
      created_at: '2024-09-08T00:00:00Z',
    },
  ],
  comment: [
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 4,
      delivery_time: 2,
      comment:
        'Ótimo produto! A qualidade é excelente e o atendimento ao cliente foi muito bom.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 5,
      delivery_time: 2,
      comment:
        'Produto excelente! Superou minhas expectativas em todos os aspectos.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 4,
      delivery_time: 2,
      comment:
        'Muito bom, mas o envio demorou um pouco mais do que eu esperava.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 3,
      delivery_time: 2,
      comment: 'O produto é bom, mas tive alguns problemas com a instalação.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 5,
      delivery_time: 2,
      comment:
        'Excelente! Atendeu a todas as minhas necessidades e é de alta qualidade.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 2,
      delivery_time: 2,
      comment:
        'Infelizmente, o produto chegou com defeito e a experiência não foi boa.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 4,
      delivery_time: 2,
      comment:
        'Bom produto, mas a embalagem poderia ser melhor para proteger o item.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 5,
      delivery_time: 2,
      comment:
        'Muito satisfeito com a compra! O produto é exatamente como descrito.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 3,
      delivery_time: 2,
      comment:
        'O produto é bom, mas a entrega foi lenta e não foi bem comunicada.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 4,
      delivery_time: 2,
      comment: 'Bom produto, mas o manual poderia ser mais detalhado.',
    },
    {
      user: '66dcabb3d6921148f63c1b70',
      product: '66dcc5c1d74d8f522ccb8e23',
      rating: 5,
      delivery_time: 2,
      comment: 'Produto incrível, com excelente custo-benefício. Recomendo!',
    },
  ],

  company: [
    {
      _id: '66e6397153330e3d00249927',
      logo: '/company/logo.svg',
      cnpj: '15527876094888',
      corporate_name: 'Fatz',
      website: 'https://google.de/maecenas/leo.html',
      social_media: {
        facebook: 'http://pbs.org/semper/porta/volutpat/quam.xml',
        instagram: 'http://goodreads.com/suspendisse/potenti/cras.aspx',
      },
    },
    {
      _id: '66e6397153330e3d00249928',
      logo: '/company/logo.svg',
      cnpj: '28968748521439',
      corporate_name: 'Topicstorm',
      website: 'https://forbes.com/consequat/lectus/in.js',
      social_media: {
        facebook: 'http://de.vu/convallis.html',
        instagram:
          'https://ucsd.edu/maecenas/pulvinar/lobortis/est/phasellus.html',
      },
    },
    {
      logo: '/company/logo.svg',
      cnpj: '90647813038268',
      corporate_name: 'Skyvu',
      website:
        'https://mapquest.com/diam/id/ornare/imperdiet/sapien/urna/pretium.jpg',
      social_media: {
        facebook: 'http://linkedin.com/arcu/adipiscing/molestie/hendrerit.json',
        instagram: 'http://sourceforge.net/dapibus/nulla.jsp',
      },
    },
    {
      logo: '/company/logo.svg',
      cnpj: '73494620658779',
      corporate_name: 'Chatterbridge',
      website: 'http://alibaba.com/aliquet/massa/id/lobortis/convallis.js',
      social_media: {
        facebook: 'https://bandcamp.com/integer/aliquet/massa/id/lobortis.jsp',
        instagram:
          'https://google.cn/hac/habitasse/platea/dictumst/morbi/vestibulum.json',
      },
    },
    {
      logo: '/company/logo.svg',
      cnpj: '29349673923601',
      corporate_name: 'Feedmix',
      website:
        'http://bizjournals.com/quis/turpis/sed/ante/vivamus/tortor/duis.aspx',
      social_media: {
        facebook: 'https://sakura.ne.jp/posuere/cubilia.jsp',
        instagram:
          'https://biblegateway.com/consectetuer/eget/rutrum/at/lorem/integer.aspx',
      },
    },
    {
      logo: '/company/logo.svg',
      cnpj: '41709743136747',
      corporate_name: 'Podcat',
      website: 'https://bandcamp.com/tincidunt.png',
      social_media: {
        facebook: 'https://t.co/consectetuer/eget/rutrum/at/lorem.png',
        instagram:
          'http://acquirethisname.com/nunc/viverra/dapibus/nulla/suscipit/ligula/in.aspx',
      },
    },
    {
      logo: '/company/logo.svg',
      cnpj: '90848147775670',
      corporate_name: 'Divape',
      website: 'http://ca.gov/vel/sem/sed/sagittis.jpg',
      social_media: {
        facebook: 'http://sfgate.com/nascetur/ridiculus/mus/vivamus.png',
        instagram: 'https://bing.com/et/ultrices.js',
      },
    },
  ],
  deal: [
    {
      product: '66dcc5c1d74d8f522ccb8e11',
      name: 'Desconto especial',
      discount_amount: 5,
      discount_type: 'percentage',
      valid_from: new Date('2024-09-01T00:00:00Z'),
      valid_to: new Date('2024-12-31T23:59:59Z'),
    },
  ],
};
