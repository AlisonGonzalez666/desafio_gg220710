'use client';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  urlImage: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 flex flex-row items-center gap-4 bg-white shadow-sm w-full">
      {/* Contenedor de la Imagen (Obligatorio next/image y a la izquierda) */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
        <Image 
          src={product.urlImage} 
          alt={product.title} 
          fill
          sizes="96px"
          className="object-cover"
          priority={product.id <= 4}
        />
      </div>
      
      {/* Información del producto a la derecha */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-base text-gray-900 truncate">{product.title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">Categoría: {product.category}</p>
        <p className="text-green-600 font-semibold mt-1 text-sm">${product.price}</p>
        <button 
          onClick={() => onAddToCart(product)}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded font-medium transition-colors"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}