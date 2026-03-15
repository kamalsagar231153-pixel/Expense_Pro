// src/app.js

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import exportRoutes from "./routes/export.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";
import incomeRoutes from "./routes/income.routes.js";
import path from "path";

dotenv.config();

// Connect Database
connectDB();

const app = express();

const _dirname = path.resolve();

/* -------------------- GLOBAL MIDDLEWARES -------------------- */

// Parse JSON
app.use(express.json());

// Security Headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Rate Limiting (Prevent brute force)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests from this IP, please try again later."
  })
);

/* -------------------- ROUTES -------------------- */

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Smart Expense Tracker API Running"
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/export", exportRoutes);

/* -------------------- 404 HANDLER -------------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

app.use(express.static(path.join(_dirname, "client", "dist")));

app.use((req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

/* -------------------- GLOBAL ERROR HANDLER -------------------- */

app.use(errorHandler);

export default app;