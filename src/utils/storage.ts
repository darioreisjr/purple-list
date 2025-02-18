import { Product } from '../types/Product';

const STORAGE_KEY = 'products';
const CATEGORIES_KEY = 'categories';

export const getProducts = (): Product[] => {
  const products = localStorage.getItem(STORAGE_KEY);
  return products ? JSON.parse(products) : [];
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