const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "out_of_stock"],
    default: "available",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  imageUrl: String,
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

