import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X } from 'lucide-react';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      {/* Image */}
      <Link to={`/product/${item.id}`}>
        <img
          src={item.image}
          alt={item.name}
          className="cart-item-img"
        />
      </Link>

      {/* Info */}
      <div>
        <Link to={`/product/${item.id}`} className="cart-item-name">
          {item.name}
        </Link>
        <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
        <div className="cart-item-qty">
          <button
            className="cart-qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus size={13} />
          </button>
          <span className="cart-qty-num">{item.quantity}</span>
          <button
            className="cart-qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus size={13} />
          </button>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginLeft: '0.25rem' }}>
            × ${item.price} each
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        className="cart-item-remove"
        onClick={() => removeFromCart(item.id)}
        aria-label="Remove item"
      >
        <X size={15} />
      </button>
    </div>
  );
};

export default CartItem;