import {
  setBudgetService,
  getBudgetStatusService
} from "../services/budget.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const setBudget = async (req, res) => {
  try {
    const budget = await setBudgetService(req.body, req.user);
    successResponse(res, budget, "Budget set successfully");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const getBudgetStatus = async (req, res) => {
  try {
    const status = await getBudgetStatusService(req.user);
    successResponse(res, status);
  } catch (error) {
    errorResponse(res, error.message);
  }
};