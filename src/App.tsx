import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProductForm from './components/ProductForm';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import CategoryManagement from './components/CategoryManagement';
import ProductDetails from './components/ProductDetails';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';
import { LayoutGrid, Package, PlusCircle, Tags } from 'lucide-react';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          {/* Toast Container */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              className: 'dark:bg-gray-800 dark:text-white',
              style: {
                background: '#4B5563',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#047857',
                },
              },
              error: {
                style: {
                  background: '#DC2626',
                },
              },
            }}
          />

          {/* Navigation */}
          <nav className="bg-purple-800 dark:bg-purple-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-8">
                  <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
                    <Package size={24} />
                    <span>Produtos</span>
                  </Link>
                  
                  <div className="flex space-x-4">
                    <Link to="/dashboard" className="flex items-center space-x-1 hover:text-purple-200 transition">
                      <LayoutGrid size={20} />
                      <span>Dashboard</span>
                    </Link>
                    <Link to="/new" className="flex items-center space-x-1 hover:text-purple-200 transition">
                      <PlusCircle size={20} />
                      <span>Novo Produto</span>
                    </Link>
                    <Link to="/categories" className="flex items-center space-x-1 hover:text-purple-200 transition">
                      <Tags size={20} />
                      <span>Categorias</span>
                    </Link>
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;