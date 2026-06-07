// frontend/src/components/AuthModal.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    login, 
    register 
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    if (authModalMode === 'login') {
      const success = await login(email, password);
      if (success) {
        setEmail('');
        setPassword('');
      }
    } else {
      const success = await register(name, email, password);
      if (success) {
        setName('');
        setEmail('');
        setPassword('');
      }
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      <div className="auth-modal-overlay">
        {/* Backdrop */}
        <motion.div 
          className="auth-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
        />
        
        {/* Modal Container */}
        <motion.div 
          className="auth-modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        >
          <button 
            className="auth-modal-close" 
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="auth-modal-header">
            <span className="auth-modal-badge">✦ ShopVibe Couture</span>
            <h2>{authModalMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <p>
              {authModalMode === 'login' 
                ? 'Sign in to access your profile, orders, and wishlist.' 
                : 'Join us to get exclusive offers and track your style.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-modal-form">
            {authModalMode === 'register' && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail className="input-icon" size={16} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={16} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Please wait...' : authModalMode === 'login' ? 'Sign In' : 'Sign Up'}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-modal-footer">
            {authModalMode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button onClick={() => setAuthModalMode('register')}>Sign Up</button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button onClick={() => setAuthModalMode('login')}>Sign In</button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
