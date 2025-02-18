import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveProduct, getCategories, getProduct } from '../utils/storage';
import { PlusCircle, Save, ImageOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: ''
  });

  useEffect(() => {
    setCategories(getCategories());

    if (id) {
      const product = getProduct(id);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          imageUrl: product.imageUrl,
          category: product.category,
          stock: product.stock.toString()
        });
      } else {
        toast.error('Produto não encontrado');
        navigate('/dashboard');
      }
    }
  }, [id, navigate]);

  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl.startsWith('http')) {
      toast.error('Por favor, insira uma URL válida para a imagem');
      return;
    }

    // Validate image URL
    const isValidImage = await validateImageUrl(formData.imageUrl);
    if (!isValidImage) {
      toast.error('A URL da imagem é inválida ou a imagem não está acessível');
      return;
    }

    const product = {
      id: id || crypto.randomUUID(),
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      imageUrl: formData.imageUrl,
      category: formData.category,
      stock: Number(formData.stock),
      createdAt: id ? getProduct(id)?.createdAt || new Date().toISOString() : new Date().toISOString()
    };

    saveProduct(product);
    toast.success(id ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
    navigate('/dashboard');
  };

  const handleImageUrlChange = async (url: string) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
    if (url.startsWith('http')) {
      const isValid = await validateImageUrl(url);
      setImageError(!isValid);
    } else {
      setImageError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'imageUrl') {
      handleImageUrlChange(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-400">
            {id ? 'Editar Produto' : 'Cadastrar Novo Produto'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {id ? 'Atualize as informações do produto' : 'Preencha todos os campos para cadastrar um novo produto'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nome do Produto</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark: "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Descrição</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark:focus:ring-purple-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Preço</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark:focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Estoque</label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark:focus:ring-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">URL da Imagem</label>
            <input
              type="url"
              name="imageUrl"
              required
              value={formData.imageUrl}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${imageError
                ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400'
                }`}
            />
            <div className="mt-2">
              {formData.imageUrl && (
                <div className="relative inline-block">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className={`h-32 w-32 object-cover rounded-lg ${imageError ? 'opacity-50' : ''
                      }`}
                    onError={() => setImageError(true)}
                  />
                  {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <div className="text-center">
                        <ImageOff className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Imagem inválida</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Categoria</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark:focus:ring-purple-400"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            {id ? (
              <>
                <Save size={20} />
                Salvar Alterações
              </>
            ) : (
              <>
                <PlusCircle size={20} />
                Cadastrar Produto
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}