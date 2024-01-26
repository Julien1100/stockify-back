import Product from "../models/productModel";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.send(allProducts);
  } catch (error) {
    res.send(error);
  }
};
