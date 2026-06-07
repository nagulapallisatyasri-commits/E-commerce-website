// frontend/src/pages/ShopPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const FALLBACK_PRODUCTS = [
  { _id: '1', id: '1', name: 'Elegant Velvet Evening Gown', price: 189.99, category: "Women's Dresses", image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', rating: 4.8, stock: 12 },
  { _id: '2', id: '2', name: 'Vibrant Satin Midi Dress', price: 95.00, category: "Women's Dresses", image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600', rating: 4.7, stock: 15 },
  { _id: '3', id: '3', name: 'Classic Beige Trench Coat', price: 149.99, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', rating: 4.6, stock: 10 },
  { _id: '4', id: '4', name: 'Floral Summer Sundress', price: 79.99, category: "Women's Dresses", image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600', rating: 4.5, stock: 20 },
  { _id: '5', id: '5', name: 'Structured Blazer Jacket', price: 129.99, category: "Men's Wear", image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600', rating: 4.9, stock: 8 },
  { _id: '6', id: '6', name: 'Diamond Drop Earrings', price: 299.00, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', rating: 4.9, stock: 5 },
  { _id: '7', id: '7', name: 'Leather Crossbody Bag', price: 159.99, category: 'Bags', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600', rating: 4.7, stock: 14 },
  { _id: '8', id: '8', name: 'Classic Leather Loafers', price: 125.00, category: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600', rating: 4.6, stock: 18 },
  { _id: '9', id: '9', name: 'Kids Denim Overalls', price: 45.00, category: 'Kids', image: 'https://images.unsplash.com/photo-1519238263530-99b50bc56a29?w=600', rating: 4.8, stock: 20 },
  { _id: '10', id: '10', name: 'Vintage Sunglasses', price: 55.00, category: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600', rating: 4.5, stock: 30 },
];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products');
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (error) {
        console.error('Error fetching shop products:', error);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="wishlist-loading-container">
        <div className="wishlist-loader"></div>
        <p>Gathering the collection...</p>
      </div>
    );
  }

  return (
    <div className="shop-page-wrapper">
      <div className="shop-page-header container-max" style={{ marginBottom: '2.5rem' }}>
        <span className="shop-badge">✦ RUNWAY READY</span>
        <h1>The Collection</h1>
        <p>Explore high-end couture, tailored outerwear, and elegant designs.</p>
      </div>

      <div className="shop-controls-container container-max" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3.5rem' }}>
        {/* Search */}
        <div className="shop-search-bar" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <input
            type="text"
            placeholder="Search outfits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Filters */}
        <div className="shop-category-filters" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="shop-products-grid-container container-max">
        {filteredProducts.length === 0 ? (
          <div className="shop-no-results">
            <p>No outfits match your criteria. Try another search or filter.</p>
          </div>
        ) : (
          <motion.div 
            className="shop-products-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;