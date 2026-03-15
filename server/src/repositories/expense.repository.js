// src/repositories/expense.repository.js

import Expense from "../models/expense.model.js";

export const createExpenseRepo = async (data) => {
  return await Expense.create(data);
};

export const findExpensesRepo = async (filters) => {
  return await Expense.find(filters).sort({ date: -1 });
};

export const updateExpenseRepo = async (id, userId, updateData) => {
  return await Expense.findOneAndUpdate(
    { _id: id, user: userId },
    updateData,
    { new: true }
  );
};

export const deleteExpenseRepo = async (id, userId) => {
  return await Expense.findOneAndDelete({
    _id: id,
    user: userId
  });
};

export const aggregateExpensesRepo = async (pipeline) => {
  return await Expense.aggregate(pipeline);
};