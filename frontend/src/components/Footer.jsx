import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ShopVibe</h3>
            <p className="text-gray-400">Your one-stop shop for premium products with style and quality.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/shop" className="hover:text-primary transition">Shop</a></li>
              <li><a href="/about" className="hover:text-primary transition">About</a></li>
              <li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition">Shipping</a></li>
              <li><a href="#" className="hover:text-primary transition">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition">Instagram</a>
              <a href="#" className="hover:text-primary transition">Twitter</a>
              <a href="#" className="hover:text-primary transition">Facebook</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center gap-1">Made with <Heart className="w-4 h-4 text-accent" /> for e-commerce learning</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;