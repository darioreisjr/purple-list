import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts } from '../utils/storage';
import { formatToBRL } from '../utils/format';
import { ArrowLeft, Package } from 'lucide-react';
import { Product } from '../types/Product';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const products = getProducts();
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct || null);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Package size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Produto não encontrado</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">O produto que você está procurando não existe ou foi removido.</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
          >
            <ArrowLeft size={20} />
            Voltar para a lista de produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mb-8"
        >
          <ArrowLeft size={20} />
          Voltar para a lista de produtos
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:flex-shrink-0 md:w-1/2">
              <img
                className="h-96 w-full object-cover md:h-full"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>

            {/* Product Info */}
            <div className="p-8 md:w-1/2">
              <div className="mb-4">
                <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{product.name}</h1>

              <div className="mb-6">
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {formatToBRL(product.price)}
                </span>
              </div>

              <div className="prose prose-purple dark:prose-invert max-w-none mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Descrição</h3>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{product.description}</p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Estoque</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{product.stock} unidades</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Cadastro</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}