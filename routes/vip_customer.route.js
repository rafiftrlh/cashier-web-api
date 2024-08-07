import express from "express"
import {
  getAllVIPCustomer
} from "../controllers/vip_customer.route.js"

const router = express.Router()

router.get("/", getAllVIPCustomer)

export default router