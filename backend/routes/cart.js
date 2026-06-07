// backend/routes/cart.js
import express from 'express';
const router = express.Router();

// In-memory cart (for demo - in production use database)
let userCarts = new Map();

router.get('/:userId', (req, res) => {
  const cart = userCarts.get(req.params.userId) || { items: [], total: 0 };
  res.json(cart);
});

router.post('/add', (req, res) => {
  const { userId, product, quantity } = req.body;
  let cart = userCarts.get(userId) || { items: [], total: 0 };
  
  const existingItem = cart.items.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product, quantity });
  }
  
  cart.total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  userCarts.set(userId, cart);
  res.json(cart);
});

router.delete('/remove/:userId/:productId', (req, res) => {
  const { userId, productId } = req.params;
  let cart = userCarts.get(userId);
  if (cart) {
    cart.items = cart.items.filter(item => item.product.id != productId);
    cart.total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    userCarts.set(userId, cart);
  }
  res.json(cart);
});

export default router;