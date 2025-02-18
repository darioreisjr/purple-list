import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../utils/storage';
import { formatToBRL } from '../utils/format';
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [products, setProducts] = useState(getProducts());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 10;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleDelete = (id: string, name: string) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="text-white">
          Tem certeza que deseja excluir <strong>{name}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              deleteProduct(id);
              setProducts(getProducts());
              toast.dismiss(t.id);
              toast.success('Produto excluído com sucesso!');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Excluir
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        background: '#1F2937',
        padding: '1rem',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-400">Dashboard de Produtos</h1>
          <Link
            to="/new"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-4 py-2 rounded-md transition duration-200"
          >
            <Plus size={20} />
            Novo Produto
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 sm:text-sm"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-purple-50 dark:bg-purple-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase tracking-wider">Produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase tracking-wider">Estoque</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{product.description.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatToBRL(product.price)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.stock}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={20} />
                      </button>
                      <Link
                        to={`/edit/${product.id}`}
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition-colors p-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      >
                        <Edit size={20} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex justify-center flex-1">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                      ${currentPage === page
                        ? 'z-10 bg-purple-600 border-purple-600 text-white dark:bg-purple-700 dark:border-purple-700'
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}