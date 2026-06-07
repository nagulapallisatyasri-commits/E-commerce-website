// frontend/src/pages/WishlistPage.jsx
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const WishlistPage = () => {
  const { wishlistItems, loading } = useWishlist();

  if (loading) {
    return (
      <div className="wishlist-loading-container">
        <div className="wishlist-loader"></div>
        <p>Loading your curation...</p>
      </div>
    );
  }

  return (
    <div className="wishlist-page-container">
      {/* Header */}
      <div className="wishlist-header">
        <Link to="/shop" className="back-btn">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
        <span className="wishlist-badge">✦ Saved Gems</span>
        <h1>Your Wishlist</h1>
        <p className="wishlist-subtitle">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} currently saved for your look.
        </p>
      </div>

      {/* Grid or Empty State */}
      {wishlistItems.length === 0 ? (
        <motion.div 
          className="wishlist-empty-state"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="empty-heart-wrap">
            <Heart size={38} className="empty-heart-icon" />
          </div>
          <h3>Your wishlist is looking empty</h3>
          <p>Explore our exclusive collection and save your favorite outfits here.</p>
          <Link to="/shop" className="empty-shop-btn">
            <ShoppingBag size={16} />
            Explore Collection
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          className="wishlist-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {wishlistItems.map((product) => (
            <div key={product._id || product.id} className="wishlist-grid-item">
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default WishlistPage;
