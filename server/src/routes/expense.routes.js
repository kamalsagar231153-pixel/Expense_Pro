import express from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} from "../controllers/expense.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createExpense);
router.get("/", protect, getExpenses);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

export default router;