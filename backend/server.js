// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import profileRoutes from './routes/profile.js';
import wishlistRoutes from './routes/wishlist.js';
import Product from './models/Product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static profile picture uploads
app.use('/uploads', express.static('uploads'));

// Sample fashion products data
const sampleProducts = [
  { name: 'Elegant Velvet Evening Gown', price: 189.99, category: "Women's Dresses", image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', rating: 4.8, stock: 12, description: 'A luxurious velvet evening gown.' },
  { name: 'Vibrant Satin Midi Dress', price: 95.00, category: "Women's Dresses", image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600', rating: 4.7, stock: 15, description: 'Crafted from premium heavy-weight satin.' },
  { name: 'Classic Beige Trench Coat', price: 149.99, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', rating: 4.6, stock: 10, description: 'A timeless double-breasted trench coat.' },
  { name: 'Floral Summer Sundress', price: 79.99, category: "Women's Dresses", image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600', rating: 4.5, stock: 20, description: 'Embrace warm sunny days in this breathable cotton sundress.' },
  { name: 'Structured Blazer Jacket', price: 129.99, category: "Men's Wear", image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600', rating: 4.9, stock: 8, description: 'An ultra-chic blazer jacket.' },
  { name: 'Diamond Drop Earrings', price: 299.00, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', rating: 4.9, stock: 5, description: 'Elegant drop earrings featuring high-quality crystals.' },
  { name: 'Leather Crossbody Bag', price: 159.99, category: 'Bags', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600', rating: 4.7, stock: 14, description: 'A sleek, minimalist leather bag for everyday use.' },
  { name: 'Classic Leather Loafers', price: 125.00, category: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600', rating: 4.6, stock: 18, description: 'Comfortable and stylish leather loafers.' },
  { name: 'Kids Denim Overalls', price: 45.00, category: 'Kids', image: 'https://images.unsplash.com/photo-1519238263530-99b50bc56a29?w=600', rating: 4.8, stock: 20, description: 'Durable and cute denim overalls for kids.' },
  { name: 'Vintage Sunglasses', price: 55.00, category: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600', rating: 4.5, stock: 30, description: 'Retro-inspired sunglasses with UV protection.' }
];

// Database seeding function
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count < 10) {
      await Product.deleteMany({});
      await Product.insertMany(sampleProducts);
      console.log('🌱 Database seeded with fashion products');
    }
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
  }
};

// MongoDB Local Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_db';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully to local database: ecommerce_db');
    console.log('📍 MongoDB running at: mongodb://localhost:27017');
    await seedProducts();
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
app.use('/api/profile', profileRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Sample products endpoint
app.get('/api/sample-products', (req, res) => {
  res.json(sampleProducts);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});