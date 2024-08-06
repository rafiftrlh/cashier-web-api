import express from "express"
import { getAllProducts, getAllProductsAvailable } from "../controllers/product.controller.js"

const router = express.Router()

router.get("/get-all", getAllProducts)
router.get("/get-available", getAllProductsAvailable)

export default router