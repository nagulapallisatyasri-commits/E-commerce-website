// frontend/src/pages/LandingPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRight, ShoppingBag, Truck, Shield, RotateCcw,
  Award, Sparkles, Star, Zap, Percent
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

// Hero Fashion Slides - 2 Women's, 2 Men's
const SLIDES = [
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVPDL-l___apN1ayBw-SdnUE1ZBDZ0LbQr1Bw7Enzjbw&s=10',
    tagTop: '✦ New Collection ✦',
    tagBot: 'Luxury Satin',
  },
  {
    image: 'https://assets.gqindia.com/photos/699959bcfe368ed421aa4d9d/master/w_2560%2Cc_limit/JUNG%2520KOOK%2520HUBLOT%2520GLOBAL%2520BRAND%2520AMBASSADOR%2520(3).jpg',
    tagTop: '🔥 Best Seller',
    tagBot: 'Men\'s Summer Chic',
  },
  {
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    tagTop: 'Premium Quality',
    tagBot: '✦ Evening Wear ✦',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdMgJVPeED8OnkaLERluuF_rIChLxfFN-7-FDrnVReQg&s=10',
    tagTop: '🛍️ Buy Now',
    tagBot: 'Men\'s Boho Style',
  },
];

// Fallback Featured Products (Fashion/Dresses theme)
const FALLBACK_FEATURED = [
  { _id: '1', id: '1', name: 'Elegant Velvet Evening Gown', price: 189.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', rating: 4.8, category: 'Dresses' },
  { _id: '2', id: '2', name: 'Vibrant Satin Midi Dress', price: 95.00, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600', rating: 4.7, category: 'Dresses' },
  { _id: '3', id: '3', name: 'Classic Beige Trench Coat', price: 149.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', rating: 4.6, category: 'Outerwear' },
  { _id: '4', id: '4', name: 'Floral Summer Sundress', price: 79.99, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600', rating: 4.5, category: 'Dresses' },
];

const LandingPage = () => {
  const [slide, setSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Auto-rotate Hero Image Slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle Hash Scroll
  useEffect(() => {
    if (window.location.hash === '#about-us') {
      setTimeout(() => {
        const element = document.getElementById('about-us');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [window.location.hash]);

  // Fetch Featured Products from backend (Seeded MongoDB)
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get('/products');
        if (res.data && res.data.length > 0) {
          setFeaturedProducts(res.data.slice(0, 4));
        } else {
          setFeaturedProducts(FALLBACK_FEATURED);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setFeaturedProducts(FALLBACK_FEATURED);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchFeatured();
  }, []);

  const currentSlide = SLIDES[slide];

  // Scroll to Categories handler
  const scrollToCategories = () => {
    const element = document.getElementById('categories-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page-root">

      {/* ══════════════ HERO SECTION ══════════════ */}
      <section className="hero-section">
        {/* Left Side Content */}
        <div className="hero-left-content">
          <motion.span
            className="hero-eyebrow-tag"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✦ HAUTE COUTURE 2026
          </motion.span>

          <motion.h1
            className="hero-main-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover Attire That Defines Your <span className="title-highlight">Elegance</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore carefully crafted garments designed for comfort, luxury, and modern fashion statement.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta-buttons"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/shop" className="hero-btn-primary">
              <ShoppingBag size={18} /> Shop Collection
            </Link>
            <button onClick={scrollToCategories} className="hero-btn-secondary">
              Explore Categories
            </button>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            className="hero-stats-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="stat-item">
              <h4>10K+</h4>
              <p>Happy Customers</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h4>500+</h4>
              <p>Premium Styles</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h4 className="flex items-center gap-1 justify-center">
                4.9 <Star size={15} className="fill-gold text-gold" />
              </h4>
              <p>Average Rating</p>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="hero-badges-strip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="trust-badge">
              <Truck size={15} /> Free Shipping
            </div>
            <div className="trust-badge">
              <Shield size={15} /> Secure Payment
            </div>
            <div className="trust-badge">
              <RotateCcw size={15} /> Easy Returns
            </div>
          </motion.div>
        </div>

        {/* Center/Right Circle & Slide Show */}
        <div className="hero-center-slideshow" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Static Circle Backdrop */}
          <div className="hero-static-circle-bg" style={{ position: 'relative', overflow: 'visible' }}>

            {/* Circular clipped image wrapper */}
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={slide}
                  src={currentSlide.image}
                  alt="Fashion Model"
                  className="hero-product-center-img"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </AnimatePresence>
            </div>

            {/* Floating Tag - Top (sits on top of image, top-right) */}
            <motion.div
              className="glass-float-tag"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                top: '8%',
                right: '5%',
                background: 'linear-gradient(135deg, #FDF6EC 0%, #FAEFE0 100%)',
                border: '1px solid rgba(176, 125, 58, 0.25)',
                padding: '12px 24px',
                borderRadius: '999px',
                boxShadow: '0 8px 32px rgba(176,125,58,0.18)',
                color: '#B07D3A',
                fontWeight: '600',
                fontSize: '1rem',
                zIndex: 20,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {currentSlide.tagTop}
            </motion.div>

            {/* Floating Tag - Bottom (sits on top of image, bottom-left) */}
            <motion.div
              className="glass-float-tag"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.3 }}
              style={{
                position: 'absolute',
                bottom: '12%',
                left: '5%',
                background: 'linear-gradient(135deg, #FDF6EC 0%, #FAEFE0 100%)',
                border: '1px solid rgba(176, 125, 58, 0.25)',
                padding: '12px 24px',
                borderRadius: '999px',
                boxShadow: '0 8px 32px rgba(176,125,58,0.18)',
                color: '#B07D3A',
                fontWeight: '600',
                fontSize: '1rem',
                zIndex: 20,
                whiteSpace: 'nowrap'
              }}
            >
              {currentSlide.tagBot}
            </motion.div>

          </div>

          {/* Right side thumbnails pop up from circle */}
          <div className="hero-right-thumbnails" style={{
            position: 'absolute',
            right: '-60px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            zIndex: 10
          }}>
            {SLIDES.filter((_, idx) => idx !== slide).slice(0, 3).map((s, idx) => (
              <div
                key={idx}
                className="thumb-circle"
                onClick={() => {
                  const targetIdx = SLIDES.indexOf(s);
                  if (targetIdx !== -1) setSlide(targetIdx);
                }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid white',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={s.image} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots & Nav */}
        <div className="hero-indicators">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot-indicator ${idx === slide ? 'active' : ''}`}
              onClick={() => setSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════ FEATURED PRODUCTS ══════════════ */}
      <section className="featured-products-section">
        <div className="section-title-wrap">
          <span className="section-eyebrow">✦ HANDPICKED SELECTION</span>
          <h2 className="section-title">Trending Now</h2>
          <p className="section-subtitle">
            Uncover this season's most coveted couture styles, designed to empower.
          </p>
        </div>

        {loadingProducts ? (
          <div className="products-loading">
            <div className="wishlist-loader"></div>
            <p>Curating featured looks...</p>
          </div>
        ) : (
          <div className="products-grid container-max">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}

        <div className="view-all-container" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/shop" className="btn-primary">
            View All Couture <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ══════════════ PREMIUM PROMOTIONAL BANNER ══════════════ */}
      <section className="premium-promo-banner">
        <div className="promo-banner-gradient-overlay"></div>
        <div className="promo-banner-content-container container-max">
          <motion.div
            className="promo-glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="promo-badge">
              <Zap size={12} className="fill-gold" /> Exclusive Event
            </span>
            <h3 className="promo-title">Transform Your Wardrobe with Timeless Couture</h3>
            <p className="promo-description">
              Exclusive runway and ready-to-wear collections crafted carefully for modern sophistication. Enjoy limited-time pricing today.
            </p>
            <Link to="/shop" className="promo-cta-btn">
              Explore Collection <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ CATEGORIES SECTION ══════════════ */}
      <section id="categories-section" className="categories-section-wrapper">
        <div className="section-title-wrap">
          <span className="section-eyebrow">✦ SHOP BY CLASSIFICATION</span>
          <h2 className="section-title">Explore Styles</h2>
        </div>
        <div className="categories-grid container-max">
          {[
            { label: 'Dresses', img: 'https://i.pinimg.com/1200x/3f/5d/2e/3f5d2e6ba333352fecea1af2d1b4c77a.jpg', count: '18 Styles' },
            { label: 'Outerwear', img: 'https://newsimg.koreatimes.co.kr/2025/12/22/0937dd91-26d1-4405-b8fe-1a19d372577e.jpg', count: '12 Styles' },
            { label: 'Couture', img: 'https://stylerave.com/wp-content/uploads/2024/07/04345184-792e-44b4-af42-266d65ff1764-e1720630469932.jpg', count: '9 Styles' },
          ].map(({ label, img, count }) => (
            <Link
              key={label}
              to="/shop"
              className="category-card-wrap"
            >
              <img src={img} alt={label} className="category-image" />
              <div className="category-gradient-bg"></div>
              <div className="category-card-content">
                <span className="category-count">{count}</span>
                <h4>{label}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════ ABOUT US SECTION ══════════════ */}
      <section id="about-us" className="about-us-section">
        <div className="about-us-grid container-max">
          {/* Left Column - Image */}
          <div className="about-image-column">
            <div className="about-image-wrapper">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/f16c429f-6b38-4f2e-ad29-f5e277bf1bdb.jpeg?crop=0.667xw:1xh;0.19xw,0xh&resize=1120:*"
                alt="ShopVibe Design Studio"
                className="about-image"
              />
              <div className="about-floating-card">
                <Award size={24} className="text-gold" />
                <div>
                  <h5>Award-Winning</h5>
                  <p>Design Studio 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Story, Mission, Vision */}
          <div className="about-content-column">
            <span className="section-eyebrow">✦ OUR ESSENCE</span>
            <h2 className="about-main-title">Crafting Confidence Through Fine Apparel</h2>
            <p className="about-intro-text">
              Established with a vision to redefine modern wardrobe essentials, ShopVibe Couture combines exceptional materials with timeless silhouettes.
            </p>

            <div className="about-details-stack">
              <div className="about-detail-item">
                <h4>Our Story</h4>
                <p>We began as a small boutique atelier focusing on custom bridal and evening gowns, expanding into refined daily collections without losing our touch of custom quality.</p>
              </div>
              <div className="about-detail-item">
                <h4>Our Mission</h4>
                <p>To deliver ready-to-wear pieces that fit perfectly, celebrate individuality, and prioritize responsible material sourcing for modern conscious living.</p>
              </div>
              <div className="about-detail-item">
                <h4>Our Vision</h4>
                <p>Redefining luxury fashion accessibility by proving that premium garments can be crafted ethically, and worn proudly season after season.</p>
              </div>
            </div>

            {/* Additional Stats Counter */}
            <div className="about-stats-grid">
              <div className="about-stat">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
              <div className="about-stat">
                <h3>99%</h3>
                <p>Satisfaction Rate</p>
              </div>
              <div className="about-stat">
                <h3>500+</h3>
                <p>Premium Styles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;