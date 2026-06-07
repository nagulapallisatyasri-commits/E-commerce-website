import { Heart, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Brand col */}
        <div>
          <h3 className="footer-brand-name">Shop<span>Vibe</span></h3>
          <p className="footer-brand-tagline">
            Your one-stop destination for premium lifestyle products — curated with love, delivered with care.
          </p>
          <div className="footer-social">
            {['IG', 'TW', 'FB', 'YT'].map(s => (
              <a key={s} href="#" className="footer-social-btn">{s}</a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            {[
              { to: '/',        label: 'Home'     },
              { to: '/shop',    label: 'Shop'     },
              { to: '/about',   label: 'About Us' },
              { to: '/cart',    label: 'Cart'     },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>
                  <ArrowRight size={12} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul className="footer-links">
            {['FAQ', 'Shipping Policy', 'Returns & Refunds', 'Track Order', 'Contact Us'].map(item => (
              <li key={item}>
                <a href="#">
                  <ArrowRight size={12} />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h4>Stay Updated</h4>
          <p className="footer-newsletter-text">
            Subscribe for exclusive deals, new arrivals, and style inspiration delivered to your inbox.
          </p>
          <div className="footer-newsletter-form">
            <input
              type="email"
              placeholder="Your email..."
              className="footer-newsletter-input"
            />
            <button className="footer-newsletter-btn" aria-label="Subscribe">
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">
          Made with <Heart size={13} style={{ color: 'var(--pink-light)', fill: 'var(--pink-light)' }} /> by ShopVibe Team © {new Date().getFullYear()}
        </p>
        <div className="footer-copy-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;