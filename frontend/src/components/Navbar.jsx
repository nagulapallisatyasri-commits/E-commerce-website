import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform">
            ShopVibe
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-primary transition-colors">Shop</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden py-4 border-t animate-slideDown">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/shop" className="block py-2 text-gray-700 hover:text-primary transition" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-primary transition" onClick={() => setIsOpen(false)}>About</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;