import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();

  const productId = id ? parseInt(id, 10) : undefined;
  const product = products.find(p => p.id === productId);

  if (!product || !product.isEnabled) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-white mb-4">Produto não encontrado</h1>
        <p className="text-gray-400 mb-8">O produto que você está procurando não existe ou foi movido.</p>
        <Link 
          to="/products" 
          className="inline-block bg-accent hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
        >
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-neutral p-6 sm:p-8 rounded-lg shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-auto rounded-lg shadow-xl object-cover aspect-video" 
          />
        </div>
        <div className="flex flex-col h-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{product.name}</h1>
          <p className="text-gray-300 text-lg leading-relaxed flex-grow">
            {product.description}
          </p>
           <div className="mt-8">
             <Link 
                to="/products" 
                className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                &larr; Voltar ao Catálogo
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;