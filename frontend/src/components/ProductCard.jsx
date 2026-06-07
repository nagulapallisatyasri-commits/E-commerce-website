import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover group">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden h-64">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-4 right-4 bg-accent text-white px-2 py-1 rounded-full text-sm font-semibold">
            -20%
          </div>
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          <button onClick={handleAddToCart} className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors hover:scale-110 transform">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;