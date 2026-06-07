// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Local Connection
const connectDB = async () => {
  try {
    // For local MongoDB (default connection string)
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_db';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully to local database: ecommerce_db');
    console.log('📍 MongoDB running at: mongodb://localhost:27017');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Sample products endpoint
app.get('/api/sample-products', (req, res) => {
  res.json(sampleProducts);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Sample product data for initial setup
const sampleProducts = [
  { id: 1, name: 'Modern Leather Backpack', price: 89.99, category: 'Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', rating: 4.5, stock: 15 },
  { id: 2, name: 'Wireless Headphones Pro', price: 199.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', rating: 4.8, stock: 8 },
  { id: 3, name: 'Minimalist Watch', price: 149.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.6, stock: 12 },
  { id: 4, name: 'Classic White Sneakers', price: 79.99, category: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', rating: 4.7, stock: 20 },
  { id: 5, name: 'Sunglasses Ultra', price: 59.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', rating: 4.4, stock: 25 },
  { id: 6, name: 'Smart Watch Series X', price: 299.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400', rating: 4.9, stock: 5 }
];