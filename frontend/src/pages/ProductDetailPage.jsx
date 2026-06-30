// frontend/src/pages/ProductDetailPage.jsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Check,
  Heart,
  Loader2,
  Package,
} from "lucide-react";

import { productsData } from "../data/products";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Determine back button label using state passed from ProductCard
  const fromPath = location.state?.from || null;
  const backLabel =
    fromPath === "/shop"
      ? "Back to Shop"
      : fromPath === "/"
        ? "Back to Home"
        : fromPath
          ? "Go Back"
          : "Back to Shop";

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
          const localProd = productsData.find(
            (p) => p.id === id || p._id === id || p.id === parseInt(id),
          );
          setProduct(localProd || null);
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
        // Try to match local product
        const localProd = productsData.find(
          (p) => p.id === id || p._id === id || p.id === parseInt(id),
        );
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
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : product.image,
      category: product.category,
      stock: product.stock || 10,
      rating: product.rating || 4.5,
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
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : product.image,
      category: product.category,
      stock: product.stock || 10,
      rating: product.rating || 4.5,
    };
    toggleWishlist(wishlistProduct);
  };

  const imagesList =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const mainImageToShow = imagesList[selectedImageIndex] || imagesList[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button
        onClick={() => {
          if (fromPath) {
            // If we have a specific fromPath, navigate there directly
            navigate(fromPath);
          } else if (window.history.length > 1) {
            // Otherwise, go back in history
            navigate(-1);
          } else {
            // Fallback to shop
            navigate("/shop");
          }
        }}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-peach mb-8 transition font-medium"
      >
        <ArrowLeft className="w-5 h-5" /> {backLabel}
      </button>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Side - Image Gallery */}
        <div className="flex flex-col gap-6 sticky top-24">
          <div className="rounded-3xl overflow-hidden shadow-card bg-white relative group border border-peach-pale">
            <img
              src={mainImageToShow}
              alt={product.name}
              className="w-full h-auto object-cover max-h-[650px] transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <button
              onClick={handleWishlist}
              className={`absolute top-6 right-6 p-4 rounded-full bg-white/90 backdrop-blur-md shadow-soft hover:bg-white transition duration-300 ${isWishlisted ? "text-pink hover:scale-110" : "text-gray-400 hover:text-pink hover:scale-110"}`}
              aria-label="Add to wishlist"
            >
              <Heart
                size={24}
                className={isWishlisted ? "fill-pink text-pink" : ""}
              />
            </button>
          </div>

          {imagesList.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${selectedImageIndex === idx ? "border-peach shadow-md scale-105" : "border-transparent hover:border-peach-light opacity-80 hover:opacity-100"}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Product Info */}
        <div className="flex flex-col pt-4">
          <span className="section-eyebrow mb-2 self-start">
            {product.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-dark leading-tight mt-3 mb-5 tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex bg-peach-pale px-3 py-1.5 rounded-full">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating || 4.0) ? "fill-gold text-gold" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-gray-500 font-medium text-sm">
              ({product.rating || 4.0} Customer Reviews)
            </span>
          </div>

          <div className="text-4xl font-bold text-peach mb-8">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 mb-10 text-lg leading-relaxed font-light">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
            {/* Quantity Selector */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full h-14 p-1 w-full sm:w-auto shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-full flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition text-gray-500 font-bold text-xl"
              >
                -
              </button>
              <span className="min-w-[50px] text-center font-bold text-dark text-lg">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock || 10, quantity + 1))
                }
                className="w-12 h-full flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition text-gray-500 font-bold text-xl"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="btn-primary flex-1 h-14 justify-center w-full text-lg uppercase tracking-wide group"
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5 mr-2" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2 group-hover:animate-bounce" />{" "}
                  Add to Cart
                </>
              )}
            </button>
          </div>

          <div className="border-t border-gray-100 pt-8 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-peach-pale/50 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-peach">
                  <Package size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-dark">In Stock</p>
                  <p className="text-xs text-gray-500">
                    {product.stock || 10} items available
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-green-500">
                  <Check size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-dark">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over $50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
