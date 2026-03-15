import express from "express";
import {
  setIncome,
  getIncome,
  getIncomeHistory,
} from "../controllers/income.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, setIncome);
router.get("/", protect, getIncome);
router.get("/history", protect, getIncomeHistory);

export default router;