import express from "express"
import {
  getAllVIPCustomer,
  getVIPCustomer,
  createVIPCustomer
} from "../controllers/vip_customer.route.js"

const router = express.Router()

router.get("/", getAllVIPCustomer)
router.get("/:id", getVIPCustomer)
router.post("/", createVIPCustomer)

export default router