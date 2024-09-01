import express from "express";
import { getFilteredProducts } from "../../controllers/shop/product-controllers.js";

const router = express.Router();

router.get("/get", getFilteredProducts);

export default router;
