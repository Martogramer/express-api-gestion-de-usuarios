const mongoose = require("mongoose");

const productVariarionSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  size: { type: String, required: true },
  quantity: { type: Number, min: 0, required: true },
  price: { type: Number, required: true },
});
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    stock: { type: Number, default: 0 },
    imageUrl: { type: String },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    image: [String],
    variarions: [productVariarionSchema],
    ratingAverage: { type: Number, default: 0 },
    ratingQuantity: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);
export const Product = mongoose.model("Product", productSchema);
