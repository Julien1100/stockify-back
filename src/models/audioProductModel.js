import { Schema } from "mongoose";
import Product from "./productModel";

const audioProductSchema = new Schema({
  needBattery: Boolean,
});

const audioProduct = Product.discriminator("audio", audioProductSchema);

export default audioProduct;
