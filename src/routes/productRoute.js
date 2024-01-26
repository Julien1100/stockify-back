import { Router } from "express";
import { getAllProducts } from "../controllers/productController";

const productRouter = Router();

productRouter.get("/all", getAllProducts);

export default productRouter;
