import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="block h-full">
      <div className="bg-neutral rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
        <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
          <p className="text-gray-400 text-sm flex-grow">{product.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
