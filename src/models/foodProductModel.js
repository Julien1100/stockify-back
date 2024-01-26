import { Schema } from "mongoose";
import Product from "./productModel";

const foodProductSchema = new Schema({
  frozen: Boolean,
  hasExpirationDate: Boolean,
});

const foodProduct = Product.discriminator("food", foodProductSchema);

export default foodProduct;
