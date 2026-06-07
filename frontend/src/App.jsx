import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import AuthModal from './components/AuthModal';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            gutter={10}
            toastOptions={{
              duration: 2800,
              style: {
                background: '#FEFAF6',
                color: '#2A1F1A',
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '14px',
                border: '1px solid rgba(232,149,109,0.25)',
                boxShadow: '0 8px 32px rgba(58,38,28,0.12)',
              },
              success: {
                iconTheme: {
                  primary: '#E8956D',
                  secondary: '#fff',
                },
              },
            }}
          />
          <AuthModal />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/"            element={<LandingPage />} />
                <Route path="/shop"        element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart"        element={<CartPage />} />
                <Route path="/checkout"    element={<CheckoutPage />} />
                <Route path="/wishlist"    element={<WishlistPage />} />
                <Route path="/profile"     element={<ProfilePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;