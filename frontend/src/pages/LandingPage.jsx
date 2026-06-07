import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock, Sparkles, TrendingUp, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const LandingPage = () => {
  const featuredProducts = [
    { id: 1, name: 'Modern Leather Backpack', price: 89.99, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', rating: 4.5 },
    { id: 2, name: 'Wireless Headphones Pro', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', rating: 4.8 },
    { id: 3, name: 'Minimalist Watch', price: 149.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.6 },
    { id: 4, name: 'Classic White Sneakers', price: 79.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', rating: 4.7 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fadeIn">
            Discover Your Style
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Shop the latest trends with premium quality products. Free shipping on orders over $50.
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2 group">
            Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', color: 'from-blue-500 to-cyan-500' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure transactions', color: 'from-green-500 to-emerald-500' },
              { icon: Clock, title: '24/7 Support', desc: 'Always here to help', color: 'from-purple-500 to-pink-500' }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-xl transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600">Check out our most popular items this season</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Summer Sale is Live!</h3>
          <p className="text-white/90 mb-6 text-lg">Get up to 40% off on selected items. Limited time offer!</p>
          <Link to="/shop" className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 inline-block">
            Shop Sale
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Join Our Newsletter</h3>
          <p className="text-gray-600 mb-6">Get 10% off your first purchase and exclusive offers!</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-xl outline-none border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <button type="submit" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;