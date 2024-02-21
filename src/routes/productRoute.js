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
productRouter.get(":id", getOneProduct);
productRouter.post("/create", createProduct);
productRouter.patch("/update/:id", updateProduct);
productRouter.delete(":id", deleteProduct);

export default productRouter;
