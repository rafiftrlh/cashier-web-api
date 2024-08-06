import express from "express"
import { getSystemUser, getAllSystemUser, createStaff, forceDeleteStaff, restoreStaff, softDeleteStaff } from "../controllers/system_user.controller.js"

const router = express.Router()

router.get("/get-all-system-user", getAllSystemUser)
router.get("/get-system-user", getSystemUser)
router.post("/create-staff", createStaff)
router.put("/soft-delete-staff", softDeleteStaff)
router.put("/restore-staff", restoreStaff)
router.delete("/force-delete-staff", forceDeleteStaff)

export default router