import { useState, useEffect } from 'react';
import { getCategories, saveCategory, deleteCategory } from '../utils/storage';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CategoryManagement() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategory.trim()) {
      toast.error('Por favor, insira um nome para a categoria');
      return;
    }

    if (categories.includes(newCategory.trim())) {
      toast.error('Esta categoria já existe');
      return;
    }

    saveCategory(newCategory.trim());
    setCategories(getCategories());
    setNewCategory('');
    toast.success('Categoria adicionada com sucesso!');
  };

  const handleDelete = (category: string) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="text-white">
          Tem certeza que deseja excluir a categoria <strong>{category}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              deleteCategory(category);
              setCategories(getCategories());
              toast.dismiss(t.id);
              toast.success('Categoria excluída com sucesso!');
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-400 mb-8">Gerenciar Categorias</h1>

        {/* Add Category Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Adicionar Nova Categoria</h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nome da categoria"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-6 py-2 rounded-md transition duration-200"
            >
              <Plus size={20} />
              Adicionar
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-purple-50 dark:bg-purple-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase tracking-wider">
                  Nome da Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {categories.map((category) => (
                <tr key={category} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{category}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleDelete(category)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}