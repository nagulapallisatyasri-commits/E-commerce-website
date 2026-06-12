import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Search, User, Menu, X, Heart, Package } from 'lucide-react';
import { useState } from 'react';
import OrderHistoryDrawer from './OrderHistoryDrawer';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, openLoginModal } = useAuth();
  const { wishlistItems } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const navLinks = [
    { to: '/',      label: 'Home'    },
    { to: '/shop',  label: 'Shop', badge: 'New' },
    { to: '/#about-us', label: 'About Us' },
  ];

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      openLoginModal();
    }
  };

  const avatarUrl = user?.profilePicture 
    ? `http://localhost:5000${user.profilePicture}` 
    : '';

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <nav className="navbar">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          <span className="nav-brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </span>
          <span className="nav-brand-name">
            Shop<span>Vibe</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          {navLinks.map(({ to, label, badge }) => (
            <li key={to}>
              <Link
                to={to}
                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
              >
                {label}
                {badge && <span className="nav-badge">{badge}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="nav-right">
          {/* Search */}
          <div className="nav-search-wrap">
            <input
              className="nav-search-input"
              placeholder="Type here..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search size={15} className="nav-search-icon" />
          </div>

          <div className="nav-divider" />

          {/* Wishlist */}
          <Link to="/wishlist" className="nav-icon-btn" aria-label="Wishlist">
            <Heart size={17} className={wishlistCount > 0 ? 'fill-pink text-pink' : ''} />
            {wishlistCount > 0 && (
              <span className="nav-cart-badge">{wishlistCount}</span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="nav-icon-btn" aria-label="Cart">
            <ShoppingBag size={17} />
            {itemCount > 0 && (
              <span className="nav-cart-badge">{itemCount}</span>
            )}
          </Link>

          {/* User */}
          <button onClick={handleProfileClick} className="nav-icon-btn nav-profile-btn" aria-label="Account">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="nav-avatar-img" />
            ) : (
              <User size={17} />
            )}
          </button>
          
          {/* Orders Drawer Trigger */}
          <button onClick={() => {
            if (user) {
              setIsOrderDrawerOpen(true);
            } else {
              openLoginModal();
            }
          }} className="nav-icon-btn" aria-label="Orders">
            <Package size={17} />
          </button>

          {/* Mobile toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-mobile-menu ${isOpen ? 'open' : ''}`}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="nav-mobile-link"
            onClick={() => setIsOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link to="/wishlist" className="nav-mobile-link" onClick={() => setIsOpen(false)}>
          Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
        </Link>
        <Link to="/cart" className="nav-mobile-link" onClick={() => setIsOpen(false)}>
          Cart {itemCount > 0 && `(${itemCount})`}
        </Link>
        <button 
          className="nav-mobile-link text-left w-full bg-transparent border-none cursor-pointer" 
          onClick={() => { setIsOpen(false); handleProfileClick(); }}
          style={{ fontFamily: 'inherit', display: 'block', padding: '0.75rem 1rem' }}
        >
          {user ? 'Profile Dashboard' : 'Login / Register'}
        </button>

        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
          <input
            className="nav-search-input"
            placeholder="Search products..."
            style={{ width: '100%', borderRadius: 'var(--r-md)' }}
          />
        </div>
      </div>

      <OrderHistoryDrawer 
        isOpen={isOrderDrawerOpen} 
        onClose={() => setIsOrderDrawerOpen(false)} 
      />
    </header>
  );
};

export default Navbar;