import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems]   = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shopvibe_cart');
      if (saved) setCartItems(JSON.parse(saved));
    } catch (_) {}
  }, []);

  /* Persist + recalculate total */
  useEffect(() => {
    try {
      localStorage.setItem('shopvibe_cart', JSON.stringify(cartItems));
    } catch (_) {}
    const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        toast.success(`Added another ${product.name} to cart`, {
          style: { fontFamily: 'Sora, sans-serif', fontSize: '0.9rem' },
          iconTheme: { primary: '#E8956D', secondary: '#fff' },
        });
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      toast.success(`${product.name} added to cart`, {
        style: { fontFamily: 'Sora, sans-serif', fontSize: '0.9rem' },
        iconTheme: { primary: '#E8956D', secondary: '#fff' },
      });
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
    toast.success('Item removed from cart', {
      style: { fontFamily: 'Sora, sans-serif', fontSize: '0.9rem' },
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) { removeFromCart(productId); return; }
    setCartItems(prev =>
      prev.map(i => (i.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};