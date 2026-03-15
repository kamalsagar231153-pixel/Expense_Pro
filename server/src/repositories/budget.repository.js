// src/repositories/budget.repository.js

import Budget from "../models/budget.model.js";

export const upsertBudgetRepo = async (userId, month, year, amount) => {
  return await Budget.findOneAndUpdate(
    { user: userId, month, year },
    { amount },
    { upsert: true, new: true }
  );
};

export const findBudgetRepo = async (userId, month, year) => {
  return await Budget.findOne({
    user: userId,
    month,
    year
  });
};