import React, { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const ProductsPage: React.FC = () => {
  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const productsPerPage = 12;

  const enabledProducts = useMemo(() => products.filter(p => p.isEnabled), [products]);

  const categories = useMemo(() => {
    const allCategories = enabledProducts.map(p => p.category).filter(Boolean);
    return ['Todos', ...Array.from(new Set(allCategories)).sort()];
  }, [enabledProducts]);

  const filteredProducts = useMemo(() => {
    return enabledProducts
      .filter(product => {
        if (selectedCategory === 'Todos') return true;
        return product.category === selectedCategory;
      })
      .filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [enabledProducts, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center text-white mb-6">Nosso Catálogo de Produtos</h1>
      
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
            <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-accent ${
                selectedCategory === category
                ? 'bg-accent text-white shadow-lg'
                : 'bg-neutral hover:bg-gray-700 text-gray-300'
            }`}
            >
            {category}
            </button>
        ))}
      </div>

      <div className="mb-10 max-w-lg mx-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
             <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-neutral border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Buscar produtos"
          />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          <div key={`${currentPage}-${selectedCategory}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="opacity-0 animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="text-center text-gray-400 bg-neutral p-8 rounded-lg">
          <p className="text-xl font-semibold">Nenhum produto encontrado.</p>
          {searchQuery || selectedCategory !== 'Todos' ? (
            <p>Tente ajustar seus termos de busca ou filtros.</p>
          ) : (
            <p>Volte em breve ou adicione um produto no painel administrativo.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;