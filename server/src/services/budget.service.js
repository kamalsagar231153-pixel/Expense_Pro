import {
  upsertBudgetRepo,
  findBudgetRepo
} from "../repositories/budget.repository.js";
import { aggregateExpensesRepo } from "../repositories/expense.repository.js";

export const setBudgetService = async (data, userId) => {
  const { month, year, amount } = data;
  return await upsertBudgetRepo(userId, month, year, amount);
};

export const getBudgetStatusService = async (userId) => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const budget = await findBudgetRepo(userId, month, year);
  if (!budget) return { message: "No budget set" };

  const pipeline = [
    {
      $match: {
        user: budget.user,
        date: {
          $gte: new Date(year, month - 1, 1),
          $lte: new Date(year, month, 0)
        }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ];

  const expenses = await aggregateExpensesRepo(pipeline);

  const spent = expenses[0]?.total || 0;
  const percent = (spent / budget.amount) * 100;

  return {
    budget: budget.amount,
    spent,
    percent,
    warning:
      percent >= 100
        ? "Budget exceeded"
        : percent >= 80
        ? "Near budget limit"
        : "Safe"
  };
};