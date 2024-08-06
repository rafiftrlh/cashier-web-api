import express from "express"
import { getAllProducts, getAllProductsAvailable, addProduct } from "../controllers/product.controller.js"

const router = express.Router()

router.get("/get-all", getAllProducts)
router.get("/get-available", getAllProductsAvailable)
router.post("/add", addProduct)

export default router