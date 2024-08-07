import express from "express"
import {
  getAllProducts,
  getAllProductsAvailable,
  getProduct,
  addProduct,
  softDeleteProduct,
  forceDeleteProduct,
  updateProductStock
} from "../controllers/product.controller.js"

const router = express.Router()

router.get("/get-all", getAllProducts)
router.get("/get-available", getAllProductsAvailable)
router.get("/get-product/:productCode", getProduct)
router.post("/add", addProduct)
router.patch("/soft-delete/:productId", softDeleteProduct)
router.delete("/force-delete/:productId", forceDeleteProduct)
router.patch("/update-stock/:productId", updateProductStock)

export default router
