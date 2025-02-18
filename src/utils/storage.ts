import { Product } from '../types/Product';
import { getRandomDate } from './getRandomDate';
import { getRandomStock } from './getRandomStock';

const STORAGE_KEY = 'products';
const CATEGORIES_KEY = 'categories';

export const getProducts = (): Product[] => {
  const products = localStorage.getItem(STORAGE_KEY);
  return products ? JSON.parse(products) : [{
    id: '1',
    name: 'iPhone 12 Pro Max',
    description: 'O Apple iPhone 14 (128 GB) – Estelar é um smartphone premium que combina design elegante com tecnologia avançada. Com tela Super Retina XDR de 6,1 polegadas, chip A15 Bionic e câmera dupla de 12 MP, ele oferece desempenho excepcional e fotos incríveis. Disponível na cor Estelar, ele traz resistência à água e poeira (IP68), 5G e bateria de longa duração, ideal para quem busca inovação e estilo.',
    price: 3998.79,
    imageUrl: 'https://m.media-amazon.com/images/I/618Bb+QzCmL._AC_SX679_.jpg',
    category: 'Eletrônicos',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '2',
    name: 'Apple notebook MacBook Air',
    description: 'O MacBook Air de 13 polegadas com chip M1 da Apple é um notebook leve e potente, perfeito para produtividade e mobilidade. Equipado com uma CPU 8-core e GPU 7-core, ele oferece desempenho rápido e eficiente, ideal para tarefas do dia a dia e multitarefas. Com 8 GB de RAM e 256 GB de armazenamento SSD, ele combina agilidade com espaço suficiente para seus arquivos. Seu design elegante na cor Cinza Espacial e tela Retina vibrante completam a experiência premium, tornando-o uma excelente escolha para quem busca portabilidade e desempenho em um só dispositivo.',
    price: 7109.10,
    imageUrl: 'https://m.media-amazon.com/images/I/41J9j6iVDvS._AC_SX679_.jpg',
    category: 'Informática',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '3',
    name: 'Samsung Galaxy S21',
    description: 'O Samsung Galaxy S21 FE 5G é um smartphone premium com um design moderno e recursos avançados. Ele possui uma tela AMOLED de 6,4 polegadas, ideal para vídeos e jogos nítidos e vibrantes. Equipado com o potente processador Snapdragon 888, oferece desempenho rápido e eficiente para multitarefas e aplicativos exigentes. Com 128GB de armazenamento e 6GB de RAM, há espaço suficiente para seus arquivos e um funcionamento fluido. Além disso, é resistente à água (IP68), garantindo durabilidade, e suporta conectividade 5G para velocidades ultrarrápidas de internet. Uma ótima escolha para quem busca tecnologia de ponta em um dispositivo compacto.',
    price: 2499.99,
    imageUrl: 'https://m.media-amazon.com/images/I/61-YlKr38vL._AC_SX679_.jpg',
    category: 'Eletrônicos',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '4',
    name: 'Console PlayStation 5',
    description: 'O Console PlayStation®5 + Marvel s Spider-Man 2 oferece a experiência definitiva para os fãs de jogos e do universo Marvel. Com o poder de próxima geração do PS5, os gráficos ultra-realistas e o carregamento quase instantâneo, você mergulhará em Nova York como nunca antes. Em Marvels Spider-Man 2, acompanhe Peter Parker e Miles Morales em uma emocionante narrativa repleta de ação, vilões icônicos e mecânicas de jogo aprimoradas. Este pacote é perfeito para quem busca alta performance e uma aventura épica no mundo do Homem-Aranha.',
    price: 4099.90,
    imageUrl: 'https://m.media-amazon.com/images/I/612SFC+tsbL._AC_SX679_.jpg',
    category: 'Eletrônicos',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '5',
    name: 'Nike Air Max 90',
    description: 'A Nike Air Max 90 é um ícone do design e da inovação. Lançada originalmente em 1990, ela combina estilo e desempenho com seu amortecimento visível na entressola, que revolucionou o mundo dos tênis. Com um design clássico, linhas marcantes e uma paleta de cores versátil, o Air Max 90 continua sendo um símbolo de cultura sneaker, perfeito para o dia a dia ou para quem busca um toque de nostalgia urbana.',
    price: 1509.81,
    imageUrl: 'https://m.media-amazon.com/images/I/51SWgfLwmxL._AC_SX575_.jpg',
    category: 'Esportes',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '6',
    name: 'Air Jordan 1',
    description: 'Os Air Jordan 1 são tênis icônicos da Nike, lançados em 1985 em colaboração com a lenda do basquete Michael Jordan. Com design clássico e alto, eles apresentam o famoso logotipo "Wings" e o Swoosh da Nike. Disponíveis em diversas cores e materiais, os Air Jordan 1 são um símbolo de estilo, cultura sneaker e história esportiva, mantendo-se relevantes tanto na moda quanto no mundo do basquete.',
    price: 1265.24,
    imageUrl: 'https://m.media-amazon.com/images/I/51SWgfLwmxL._AC_SX575_.jpg',
    category: 'Esportes',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '7',
    name: 'Air Jordan 1',
    description: 'Os Air Jordan 1 são tênis icônicos da Nike, lançados em 1985 em colaboração com a lenda do basquete Michael Jordan. Com design clássico e alto, eles apresentam o famoso logotipo "Wings" e o Swoosh da Nike. Disponíveis em diversas cores e materiais, os Air Jordan 1 são um símbolo de estilo, cultura sneaker e história esportiva, mantendo-se relevantes tanto na moda quanto no mundo do basquete.',
    price: 1265.24,
    imageUrl: 'https://m.media-amazon.com/images/I/51SWgfLwmxL._AC_SX575_.jpg',
    category: 'Esportes',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '8',
    name: 'Air Jordan 1',
    description: 'Os Air Jordan 1 são tênis icônicos da Nike, lançados em 1985 em colaboração com a lenda do basquete Michael Jordan. Com design clássico e alto, eles apresentam o famoso logotipo "Wings" e o Swoosh da Nike. Disponíveis em diversas cores e materiais, os Air Jordan 1 são um símbolo de estilo, cultura sneaker e história esportiva, mantendo-se relevantes tanto na moda quanto no mundo do basquete.',
    price: 1265.24,
    imageUrl: 'https://m.media-amazon.com/images/I/51SWgfLwmxL._AC_SX575_.jpg',
    category: 'Esportes',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '9',
    name: 'Air Jordan 1',
    description: 'Os Air Jordan 1 são tênis icônicos da Nike, lançados em 1985 em colaboração com a lenda do basquete Michael Jordan. Com design clássico e alto, eles apresentam o famoso logotipo "Wings" e o Swoosh da Nike. Disponíveis em diversas cores e materiais, os Air Jordan 1 são um símbolo de estilo, cultura sneaker e história esportiva, mantendo-se relevantes tanto na moda quanto no mundo do basquete.',
    price: 1265.24,
    imageUrl: 'https://m.media-amazon.com/images/I/51SWgfLwmxL._AC_SX575_.jpg',
    category: 'Esportes',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '10',
    name: 'Air Jordan 1',
    description: 'Os Air Jordan 1 são tênis icônicos da Nike, lançados em 1985 em colaboração com a lenda do basquete Michael Jordan. Com design clássico e alto, eles apresentam o famoso logotipo "Wings" e o Swoosh da Nike. Disponíveis em diversas cores e materiais, os Air Jordan 1 são um símbolo de estilo, cultura sneaker e história esportiva, mantendo-se relevantes tanto na moda quanto no mundo do basquete.',
    price: 1265.24,
    imageUrl: 'https://m.media-amazon.com/images/I/51SWgfLwmxL._AC_SX575_.jpg',
    category: 'Esportes',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '11',
    name: 'Air Jordan 1',
    description: 'Os Air Jordan 1 são tênis icônicos da Nike, lançados em 1985 em colaboração com a lenda do basquete Michael Jordan. Com design clássico e alto, eles apresentam o famoso logotipo "Wings" e o Swoosh da Nike. Disponíveis em diversas cores e materiais, os Air Jordan 1 são um símbolo de estilo, cultura sneaker e história esportiva, mantendo-se relevantes tanto na moda quanto no mundo do basquete.',
    price: 1265.24,
    imageUrl: 'https://m.media-amazon.com/images/I/51SWgfLwmxL._AC_SX575_.jpg',
    category: 'Esportes',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }, {
    id: '12',
    name: 'Air Jordan 1',
    description: 'Os Air Jordan 1 são tênis icônicos da Nike, lançados em 1985 em colaboração com a lenda do basquete Michael Jordan. Com design clássico e alto, eles apresentam o famoso logotipo "Wings" e o Swoosh da Nike. Disponíveis em diversas cores e materiais, os Air Jordan 1 são um símbolo de estilo, cultura sneaker e história esportiva, mantendo-se relevantes tanto na moda quanto no mundo do basquete.',
    price: 1265.24,
    imageUrl: 'https://m.media-amazon.com/images/I/51SWgfLwmxL._AC_SX575_.jpg',
    category: 'Esportes',
    stock: getRandomStock(),
    createdAt: getRandomDate(),
  }];
};

export const saveProduct = (product: Product) => {
  const products = getProducts();
  const existingIndex = products.findIndex(p => p.id === product.id);

  if (existingIndex >= 0) {
    // Update existing product
    products[existingIndex] = product;
  } else {
    // Add new product
    products.push(product);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const getProduct = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(p => p.id === id);
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const getCategories = (): string[] => {
  const categories = localStorage.getItem(CATEGORIES_KEY);
  return categories ? JSON.parse(categories) : [
    'Eletrônicos',
    'Roupas',
    'Acessórios',
    'Livros',
    'Casa e Decoração',
    'Esportes',
    'Beleza e Cuidados Pessoais',
    'Brinquedos',
    'Alimentos e Bebidas',
    'Informática'
  ];
};

export const saveCategory = (category: string) => {
  const categories = getCategories();
  if (!categories.includes(category)) {
    categories.push(category);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
};

export const deleteCategory = (category: string) => {
  const categories = getCategories().filter(c => c !== category);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};