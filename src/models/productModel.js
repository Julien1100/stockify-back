import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  quantityTotal: Number,
  quantityInStock: { type: Number, required: true },
  location: {
    type: String,
    enum: ["freezer", "shelf"],
  },
  description: String,
});

const Product = model("Product", productSchema);

export default Product;
