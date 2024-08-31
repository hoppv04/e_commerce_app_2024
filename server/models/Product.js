import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
