// frontend/src/context/WishlistContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user, token, openLoginModal } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist when user token is set
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        setWishlistItems([]);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get('/wishlist');
        setWishlistItems(res.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token]);

  const toggleWishlist = async (product) => {
    if (!token) {
      toast.error('Please login to use wishlist features.');
      openLoginModal();
      return;
    }

    const isWishlisted = wishlistItems.some(item => item._id === product._id);

    try {
      if (isWishlisted) {
        // Remove from wishlist
        await axios.delete(`/wishlist/remove/${product._id}`);
        setWishlistItems(prev => prev.filter(item => item._id !== product._id));
        toast.success(`${product.name} removed from wishlist`, {
          icon: '💔',
          style: { fontFamily: 'Sora, sans-serif', fontSize: '0.9rem' }
        });
      } else {
        // Add to wishlist
        await axios.post('/wishlist/add', { productId: product._id });
        setWishlistItems(prev => [...prev, product]);
        toast.success(`${product.name} added to wishlist!`, {
          icon: '❤️',
          style: { fontFamily: 'Sora, sans-serif', fontSize: '0.9rem' }
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to update wishlist';
      toast.error(errorMsg);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      loading,
      toggleWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
