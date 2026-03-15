import express from "express";
import { exportCSV, exportPDF } from "../controllers/export.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/csv", protect, exportCSV);
router.get("/pdf", protect, exportPDF);

export default router;