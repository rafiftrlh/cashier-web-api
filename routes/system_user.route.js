import express from "express"
import {
  getAllSystemUser,
  getAllStaff,
  getSystemUser,
  createStaff,
  forceDeleteStaff,
  restoreStaff,
  softDeleteStaff
} from "../controllers/system_user.controller.js"

const router = express.Router()

router.get("/", getAllSystemUser)
router.get("/get-all-staff", getAllStaff)
router.get("/:id", getSystemUser)
router.post("/", createStaff)
router.put("/soft-delete/:id", softDeleteStaff)
router.put("/restore/:id", restoreStaff)
router.delete("/force-delete/:id", forceDeleteStaff)

export default router
