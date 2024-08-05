import express from "express";
import { createStaff } from "../controllers/system_user.controller.js"

const router = express.Router();

router.post("/create-staff", createStaff)

export default router