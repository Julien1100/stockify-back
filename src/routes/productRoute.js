import { Router } from "express";
import {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const productRouter = Router();

productRouter.get("/all", getAllProducts);
productRouter.get("/:productId", getOneProduct);
productRouter.post("/create", createProduct);
productRouter.patch("/update/:productId", updateProduct);
productRouter.delete("/:productId", deleteProduct);

export default productRouter;
