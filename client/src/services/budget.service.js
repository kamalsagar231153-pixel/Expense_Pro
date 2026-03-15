// src/services/budget.service.js
import api from "./api";

export const setBudget = (data) =>
  api.post("/budget", data);

export const getBudgetStatus = () =>
  api.get("/budget");