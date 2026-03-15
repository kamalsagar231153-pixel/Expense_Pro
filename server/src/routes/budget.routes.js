import express from "express";
import {
  setBudget,
  getBudgetStatus
} from "../controllers/budget.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, setBudget);
router.get("/", protect, getBudgetStatus);

export default router;