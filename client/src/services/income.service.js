import api from "./api.js";

/* SET OR UPDATE INCOME */
export const setIncome = (data) => {
  return api.post("/income", data);
};

/* GET CURRENT MONTH INCOME */
export const getIncome = () => {
  return api.get("/income");
};

/* GET INCOME HISTORY */
export const getIncomeHistory = () => {
  return api.get("/income/history");
};