import React from 'react';
import { Product } from '../types';
import { Star, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  return (
    <div 
        className="group bg-white flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-transparent hover:border-gray-200 rounded-md relative"
        onClick={() => onClick(product)}
    >
      {/* Wishlist Icon */}
      <button className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors">
          <Heart className="h-5 w-5" />
      </button>

      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 px-2 py-0.5">
            <div className="bg-[#ff3399] px-1.5 py-0.5 rounded-sm flex items-center shadow-sm">
                <span className="text-[9px] font-black italic text-white uppercase tracking-tighter">SKYLINE</span>
                <span className="text-[9px] font-bold text-gray-800 ml-1 uppercase bg-white/90 px-1 rounded-[1px]">express</span>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm text-gray-700 line-clamp-2 mb-1 h-10 leading-snug">
          {product.title}
        </h3>
        
        <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-gray-500 text-xs">AED</span>
            <span className="text-xl font-bold text-gray-900">{product.price.toFixed(2)}</span>
        </div>
        
        <div className="mt-1 mb-2 flex items-center space-x-2">
            <div className="flex items-center bg-green-700 text-white text-[10px] px-1.5 py-0.5 rounded gap-0.5 font-bold">
                {product.rating.rate} <Star className="h-2 w-2 fill-current" />
            </div>
            <span className="text-xs text-gray-400">({product.rating.count})</span>
        </div>

        <div className="mt-auto pt-2">
            <div className="text-[10px] text-orange-600 font-bold mb-2 uppercase tracking-wide">
                Arrives Tomorrow
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                className="w-full py-2 bg-transparent border-2 border-blue-600 text-blue-600 font-bold text-sm rounded hover:bg-blue-600 hover:text-white transition-colors"
            >
                Add to cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;