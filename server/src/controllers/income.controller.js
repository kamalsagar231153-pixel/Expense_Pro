import Income from "../models/income.model.js";

/* ===============================
   SET / UPDATE INCOME
================================ */
export const setIncome = async (req, res) => {
  try {
    const { amount, month, year, source, currency } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    if (amount === undefined || !month || !year) {
      return res.status(400).json({
        message: "Amount, month and year are required",
      });
    }

    const userId = req.user._id;

    let income = await Income.findOne({
      user: userId,
      month,
      year,
    });

    if (income) {
      // UPDATE
      income.amount = amount;
      income.source = source || income.source;
      income.currency = currency || income.currency;
      await income.save();
    } else {
      // CREATE
      income = await Income.create({
        user: userId,
        amount,
        month,
        year,
        source: source || "Primary",
        currency: currency || "INR",
      });
    }

    res.status(200).json({
      success: true,
      data: income,
    });

  } catch (error) {
    console.error("Income Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

/* ===============================
   GET CURRENT MONTH INCOME
================================ */
export const getIncome = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const income = await Income.findOne({
      user: req.user._id,
      month,
      year,
    });

    res.status(200).json({
      success: true,
      data: income || { amount: 0, currency: "INR" },
    });

  } catch (error) {
    console.error("Get Income Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

/* ===============================
   GET INCOME HISTORY
================================ */
export const getIncomeHistory = async (req, res) => {
  try {
    const history = await Income.find({
      user: req.user._id,
    }).sort({ year: -1, month: -1 });

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error("Income History Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};