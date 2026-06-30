import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingCart, Star, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const location = useLocation();
  
  const id = product._id || product.id;
  const isWishlisted = isInWishlist(id);

  const mainImage = (product.images && product.images.length > 0) ? product.images[0] : product.image;

  // Get the full path including search params
  const fromPath = `${location.pathname}${location.search}`;

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Ensure both MongoDB fields and mock fields map to cart expectations
    const cartProduct = {
      id: id,
      name: product.name,
      price: product.price,
      image: mainImage,
      category: product.category,
      stock: product.stock || 10,
      rating: product.rating || 4.5
    };
    addToCart(cartProduct);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    // Wrap product cleanly to pass to wishlist
    const wishlistProduct = {
      _id: id,
      id: id,
      name: product.name,
      price: product.price,
      image: mainImage,
      category: product.category,
      stock: product.stock || 10,
      rating: product.rating || 4.5
    };
    toggleWishlist(wishlistProduct);
  };

  const originalPrice = (product.price * 1.25).toFixed(2);

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} state={{ from: fromPath }}>
        <div className="product-card-img-wrap">
          <img
            src={mainImage}
            alt={product.name}
            className="product-card-img"
          />
          <span className="product-card-badge">-20%</span>
          <button
            className={`product-card-wishlist ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
          >
            <Heart size={15} className={isWishlisted ? 'fill-pink text-pink' : ''} />
          </button>
        </div>
      </Link>

      <div className="product-card-body">
        <Link to={`/product/${id}`} state={{ from: fromPath }} className="product-card-name">
          {product.name}
        </Link>

        <div className="product-card-stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(product.rating || 4.0) ? 'star-filled' : 'star-empty'}
            />
          ))}
          <span className="product-card-rating-text">({product.rating || 4.0})</span>
        </div>

        <div className="product-card-footer">
          <div>
            <span className="product-card-price">${product.price}</span>
            <span className="product-card-price-old">${originalPrice}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="product-card-add"
            aria-label="Add to cart"
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;