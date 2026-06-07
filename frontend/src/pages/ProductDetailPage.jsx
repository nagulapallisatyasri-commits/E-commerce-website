import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Star, ShoppingCart, ArrowLeft, Check } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const products = {
    1: { id: 1, name: 'Modern Leather Backpack', price: 89.99, description: 'Premium leather backpack with multiple compartments', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', rating: 4.5, category: 'Bags', stock: 15 },
    2: { id: 2, name: 'Wireless Headphones Pro', price: 199.99, description: 'High-quality wireless headphones with noise cancellation', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', rating: 4.8, category: 'Electronics', stock: 8 },
    3: { id: 3, name: 'Minimalist Watch', price: 149.99, description: 'Elegant minimalist watch with premium materials', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', rating: 4.6, category: 'Accessories', stock: 12 },
    4: { id: 4, name: 'Classic White Sneakers', price: 79.99, description: 'Comfortable and stylish white sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600', rating: 4.7, category: 'Footwear', stock: 20 },
    5: { id: 5, name: 'Sunglasses Ultra', price: 59.99, description: 'Stylish sunglasses with UV protection', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600', rating: 4.4, category: 'Accessories', stock: 25 },
    6: { id: 6, name: 'Smart Watch Series X', price: 299.99, description: 'Advanced smartwatch with health tracking', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600', rating: 4.9, category: 'Electronics', stock: 5 }
  };

  const product = products[parseInt(id)];

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
          <img src={product.image} alt={product.name} className="w-full h-auto" />
        </div>
        
        <div>
          <span className="text-sm text-primary font-semibold uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-500">({product.rating} stars)</span>
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="text-3xl font-bold text-primary mb-6">${product.price}</div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">-</button>
              <span className="px-4 py-2 border-x min-w-[50px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary flex items-center gap-2 flex-1 justify-center">
              {addedToCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
              {addedToCart ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500">In Stock: {product.stock} items</p>
            <p className="text-sm text-green-600 mt-2">✓ Free shipping on orders over $50</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;