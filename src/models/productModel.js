import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  quantityTotal: Number,
  quantityInStock: { type: Number, required: true },
  location: {
    type: String,
    enum: ["freezer", "shelf", "none"],
  },
  frozen: { type: Boolean, default: false },
  hasExpirationDate: { type: Boolean, default: false },
  needBattery: { type: Boolean, default: false },
});

const Product = model("Product", productSchema);

export default Product;
