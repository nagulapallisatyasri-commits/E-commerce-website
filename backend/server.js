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
// ✏️  Edit this array to change the Trending Now section. First image = shown on card.
const sampleProducts = [
  {
    name: 'Gucci GG Marmont',
    price: 259.99,
    category: "Women's",
    subCategory: 'Handbags',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bHV4dXJ5JTIwaGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D',
      'https://i.pinimg.com/736x/96/7d/04/967d04f28203b2138adb110a3683af73.jpg',
      'https://dbz-images.dubizzle.com/images/2026/06/04/64c356e9c5014769b8e512ed8a0d4ad7-.jpeg?impolicy=dpc'
    ],
    rating: 4.0,
    stock: 5,
    description: 'This black Gucci GG Marmont matelassé shoulder bag is crafted from leather with a signature chevron quilt pattern and features distinct gold-tone Double G hardware.'
  },
  {
    name: 'TIR-TIR Mask-Fit Red Cushion Foundation',
    price: 45.99,
    category: "Women's",
    subCategory: 'Beauty',
    images: [
      'https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2025/MARCH/20/0cCz3jXt_82c147f8e4714e01b2568db62654f876.jpg',
      'https://assets.myntassets.com/assets/images/32768640/2025/2/17/71a09996-e740-4b3e-82b3-f4cd4b535d4e1739764892520-TIR-TIR-Mask-Fit-Red-Cushion-Foundation---Camel-27-N-7041739-2.jpg',
      'https://m.media-amazon.com/images/I/61wKnkoglyL.jpg'
    ],
    rating: 4.8,
    stock: 15,
    description: 'This cushion foundation is designed to provide a flawless, "glass skin" effect while remaining lightweight and breathable. It is particularly celebrated for its durability, offering up to 72 hours of fade-resistant wear.'
  },
  {
    name: 'Saint Laurent Opyum Sandals in Patent Leather(YSL)',
    price: 1658.74,
    category: "Women's",
    subCategory: 'Shoes',
    images: [
      'https://venusbypayal.com/cdn/shop/files/EA142052-E465-4C78-B827-E4C926796EEC.jpg?v=1773521701&width=2048',
      'https://img.freeup.app/fit-in/600x600/filters:upscale()/af5ed379df74d01c09625a22356a8fda.jpg',
      'https://femi9byas.com/cdn/shop/files/CF8361FC-0A20-484D-B160-1EB36D6EE2F7.jpg?v=1774339731'
    ],
    rating: 4.3,
    stock: 14,
    description: 'The Opyum sandals are a bold, instantly recognizable statement piece from Saint Laurent. Their most striking feature is the sculpted 85mm (approx. 3.5 inches) heel, which is expertly crafted in the shape of the iconic gold-tone YSL logo plaque.'
  },
  {
    name: 'Chanel Coco Mademoiselle',
    price: 160,
    category: "Women's",
    subCategory: 'Perfumes',
    images: [
      'https://images.unsplash.com/photo-1708733145706-82da0d0596e9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hhbmVsJTIwcGVyZnVtZXxlbnwwfHwwfHx8MA==',
      'https://i.pinimg.com/736x/36/75/bf/3675bf8339458aa21e502003fbe7f0ee.jpg',
      'https://miro.medium.com/0*Pr5UeLo7WadmGSZh'
    ],
    rating: 5.0,
    stock: 10,
    description: 'Chanel Coco Mademoiselle Eau de Parfum, an iconic ambery-floral fragrance for women launched in 2001. It is designed to reflect the spirit of an independent, bold, and modern woman. '
  }
];


// Database seeding function — always re-seeds on server start
// ✏️  Edit the sampleProducts array above, then restart the backend to see changes in Trending Now
const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('🌱 Database re-seeded with latest fashion products');
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