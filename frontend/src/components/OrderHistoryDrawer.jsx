import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Loader2, Calendar, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { productsData } from '../data/products';

const OrderHistoryDrawer = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user?._id) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`/orders/user/${user._id}`);
          // Sort by newest first
          const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sorted);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [isOpen, user]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[201] shadow-2xl overflow-hidden flex flex-col border-l border-peach-pale"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-peach-pale sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-peach-pale rounded-full flex items-center justify-center text-peach">
                  <Package size={20} />
                </div>
                <h2 className="text-xl font-bold font-playfair text-dark">Order History</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-peach hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {!user ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 mb-4">Please log in to view your orders.</p>
                  <button onClick={() => { onClose(); /* need to trigger login */ }} className="btn-primary">
                    Login Now
                  </button>
                </div>
              ) : loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin text-peach" size={36} />
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-peach-light">
                  <Package className="mx-auto text-peach-light mb-4" size={48} />
                  <h3 className="text-lg font-bold text-dark mb-2">No orders yet</h3>
                  <p className="text-sm text-gray-500 mb-6">Start exploring our collection and place your first order!</p>
                  <button onClick={() => { onClose(); navigate('/shop'); }} className="btn-secondary">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order._id} className="bg-white rounded-2xl p-5 shadow-card border border-peach-pale transition hover:shadow-soft">
                      <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="space-y-4 mb-4">
                        {order.items.map((item, idx) => {
                          const fallbackProduct = productsData.find(p => p.id === item.productId || p._id === item.productId || p.id === parseInt(item.productId));
                          const fallbackImage = fallbackProduct ? (fallbackProduct.images && fallbackProduct.images.length > 0 ? fallbackProduct.images[0] : fallbackProduct.image) : '';
                          const displayImage = item.image || fallbackImage;

                          return (
                            <div key={idx} className="flex gap-4 items-center cursor-pointer group" onClick={() => { onClose(); navigate(`/product/${item.productId}`); }}>
                              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 group-hover:border-peach transition">
                                {displayImage ? (
                                  <img src={displayImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <Package size={20} />
                                  </div>
                                )}
                              </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-dark line-clamp-1 group-hover:text-peach transition">{item.name}</h4>
                              <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-dark">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                          );
                        })}
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-sm text-gray-500 font-medium">Total Amount</span>
                        <span className="text-lg font-bold text-peach">${order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            {orders.length > 0 && (
              <div className="p-6 bg-white border-t border-peach-pale">
                <button 
                  onClick={() => { onClose(); navigate('/shop'); }} 
                  className="w-full btn-secondary flex items-center justify-center"
                >
                  Continue Shopping <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderHistoryDrawer;
