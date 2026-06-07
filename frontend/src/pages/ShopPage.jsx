import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Sample products data
    const sampleProducts = [
      { id: 1, name: 'Modern Leather Backpack', price: 89.99, category: 'Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', rating: 4.5, stock: 15 },
      { id: 2, name: 'Wireless Headphones Pro', price: 199.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', rating: 4.8, stock: 8 },
      { id: 3, name: 'Minimalist Watch', price: 149.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.6, stock: 12 },
      { id: 4, name: 'Classic White Sneakers', price: 79.99, category: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', rating: 4.7, stock: 20 },
      { id: 5, name: 'Sunglasses Ultra', price: 59.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', rating: 4.4, stock: 25 },
      { id: 6, name: 'Smart Watch Series X', price: 299.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400', rating: 4.9, stock: 5 },
      { id: 7, name: 'Designer Handbag', price: 249.99, category: 'Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', rating: 4.7, stock: 10 },
      { id: 8, name: 'Sports Shoes', price: 119.99, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', rating: 4.6, stock: 18 },
    ];
    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none md:w-64"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                selectedCategory === cat 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;