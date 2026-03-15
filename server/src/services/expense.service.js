import {
  createExpenseRepo,
  findExpensesRepo,
  aggregateExpensesRepo
} from "../repositories/expense.repository.js";

export const createExpenseService = async (data, userId) => {
  return await createExpenseRepo({ ...data, user: userId });
};

export const getExpensesService = async (filters, userId) => {
  const query = { user: userId };

  if (filters.category) query.category = filters.category;

  if (filters.startDate && filters.endDate) {
    query.date = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate)
    };
  }

  if (filters.search) {
    query.notes = { $regex: filters.search, $options: "i" };
  }

  return await findExpensesRepo(query);
};