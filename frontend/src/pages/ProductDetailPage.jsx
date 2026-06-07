// frontend/src/pages/ProductDetailPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, ShoppingCart, ArrowLeft, Check, Heart, Loader2 } from 'lucide-react';

const FALLBACK_PRODUCTS = {
  1: { id: 1, name: 'Elegant Velvet Evening Gown', price: 189.99, description: 'A luxurious velvet evening gown featuring a sleek floor-length silhouette, elegant sweetheart neckline, and a subtle side slit. Perfect for formal events and black-tie galas.', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', rating: 4.8, category: 'Dresses', stock: 12 },
  2: { id: 2, name: 'Vibrant Satin Midi Dress', price: 95.00, description: 'Crafted from premium heavy-weight satin, this midi dress drapes beautifully, offering a radiant luster and effortless movement. Features adjustable spaghetti straps and a cowl neck.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600', rating: 4.7, category: 'Dresses', stock: 15 },
  3: { id: 3, name: 'Classic Beige Trench Coat', price: 149.99, description: 'A timeless double-breasted trench coat with a belted waist, adjustable storm flaps, and spacious welt pockets. Wind-resistant fabric makes it perfect for transitional seasons.', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', rating: 4.6, category: 'Outerwear', stock: 10 },
  4: { id: 4, name: 'Floral Summer Sundress', price: 79.99, description: 'Embrace warm sunny days in this breathable cotton sundress, featuring a delicate floral print, a flattering A-line silhouette, and comfortable smocked back detailing.', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600', rating: 4.5, category: 'Dresses', stock: 20 },
  5: { id: 5, name: 'Structured Blazer Jacket', price: 129.99, description: 'An ultra-chic blazer jacket with structured shoulders and a modern oversized fit. Tailored to perfection to elevate any look from professional meetings to evening outings.', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600', rating: 4.9, category: 'Outerwear', stock: 8 },
  6: { id: 6, name: 'Bohemian Floral Maxi Dress', price: 110.00, description: 'Flowy, whimsical, and romantic. This maxi dress boasts beautiful tier detailing, bell sleeves, and a deep v-neckline, made from soft rayon fabric for ultimate comfort.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600', rating: 4.4, category: 'Dresses', stock: 25 },
  7: { id: 7, name: 'Silk Wrap Cocktail Dress', price: 159.99, description: 'A luxurious wrap dress crafted from pure Mulberry silk. Featuring a true wrap design that cinches the waist, long balloon sleeves, and a soft sheen.', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600', rating: 4.7, category: 'Dresses', stock: 14 },
  8: { id: 8, name: 'Minimalist Linen Attire', price: 85.00, description: 'A clean and casual shift dress made from pre-washed pure linen. Breathable, effortless, and designed with handy side pockets for everyday wear.', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600', rating: 4.6, category: 'Dresses', stock: 18 }
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Try getting from backend first if it matches MongoDB ObjectId length
        if (id && id.length >= 24) {
          const res = await axios.get(`/products/${id}`);
          setProduct(res.data);
        } else {
          // Fall back to local products
          const localProd = FALLBACK_PRODUCTS[id] || Object.values(FALLBACK_PRODUCTS).find(p => p.id === parseInt(id));
          setProduct(localProd || null);
        }
      } catch (error) {
        console.error('Error fetching product detail:', error);
        // Try to match local product
        const localProd = FALLBACK_PRODUCTS[id] || Object.values(FALLBACK_PRODUCTS).find(p => p.id === parseInt(id));
        setProduct(localProd || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="wishlist-loading-container">
        <Loader2 className="animate-spin text-peach" size={36} />
        <p>Revealing the design...</p>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20">Outfit not found</div>;
  }

  const pId = product._id || product.id;
  const isWishlisted = isInWishlist(pId);

  const handleAddToCart = () => {
    const cartProduct = {
      id: pId,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock || 10,
      rating: product.rating || 4.5
    };
    addToCart(cartProduct, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    const wishlistProduct = {
      _id: pId,
      id: pId,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock || 10,
      rating: product.rating || 4.5
    };
    toggleWishlist(wishlistProduct);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="rounded-2xl overflow-hidden shadow-lg bg-white relative group">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover max-h-[600px] transition duration-500 group-hover:scale-105" />
          <button
            onClick={handleWishlist}
            className={`absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-white transition duration-300 ${isWishlisted ? 'text-pink' : 'text-gray-500'}`}
            aria-label="Add to wishlist"
          >
            <Heart size={20} className={isWishlisted ? 'fill-pink text-pink' : ''} />
          </button>
        </div>
        
        <div>
          <span className="text-sm text-primary font-semibold uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 4.0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-500">({product.rating || 4.0} stars)</span>
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="text-3xl font-bold text-primary mb-6">${product.price}</div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">-</button>
              <span className="px-4 py-2 border-x min-w-[50px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))} className="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary flex items-center gap-2 flex-1 justify-center">
              {addedToCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
              {addedToCart ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500">In Stock: {product.stock || 10} items</p>
            <p className="text-sm text-green-600 mt-2">✓ Free shipping on orders over $50</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;