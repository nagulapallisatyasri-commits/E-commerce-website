// backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  image: { type: String },
  images: { type: [String], default: [] },
  rating: { type: Number, default: 4.0 },
  stock: { type: Number, default: 10 },
  description: { type: String }
});

export default mongoose.model('Product', productSchema);