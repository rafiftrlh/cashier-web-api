import express from "express"
import {
  getAllVIPCustomer,
  createVIPCustomer
} from "../controllers/vip_customer.route.js"

const router = express.Router()

router.get("/", getAllVIPCustomer)
router.post("/", createVIPCustomer)

export default router