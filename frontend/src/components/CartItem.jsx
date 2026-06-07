import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-primary font-bold">${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
          className="p-1 hover:bg-gray-100 rounded transition"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
          className="p-1 hover:bg-gray-100 rounded transition"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button 
          onClick={() => removeFromCart(item.id)} 
          className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;