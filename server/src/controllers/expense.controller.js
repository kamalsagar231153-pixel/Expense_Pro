import {
  createExpenseService,
  getExpensesService
} from "../services/expense.service.js";
import Expense from "../models/expense.model.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createExpense = async (req, res) => {
  try {
    const expense = await createExpenseService(req.body, req.user);
    successResponse(res, expense, "Expense created");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await getExpensesService(req.query, req.user);
    successResponse(res, expenses);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );

    if (!expense) return errorResponse(res, "Expense not found", 404);

    successResponse(res, expense, "Expense updated");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!expense) return errorResponse(res, "Expense not found", 404);

    successResponse(res, null, "Expense deleted");
  } catch (error) {
    errorResponse(res, error.message);
  }
};