import Expense from "../models/expense.model.js";
import { createObjectCsvWriter } from "csv-writer";
import PDFDocument from "pdfkit";
import fs from "fs";

export const exportCSV = async (req, res) => {
  const expenses = await Expense.find({ user: req.user });

  const path = "expenses.csv";

  const csvWriter = createObjectCsvWriter({
    path,
    header: [
      { id: "amount", title: "Amount" },
      { id: "currency", title: "Currency" },
      { id: "category", title: "Category" },
      { id: "date", title: "Date" }
    ]
  });

  await csvWriter.writeRecords(expenses);
  res.download(path);
};

export const exportPDF = async (req, res) => {
  const expenses = await Expense.find({ user: req.user });

  const doc = new PDFDocument();
  const path = "expenses.pdf";

  doc.pipe(fs.createWriteStream(path));

  doc.fontSize(18).text("Expense Report", { align: "center" });
  doc.moveDown();

  expenses.forEach((exp) => {
    doc
      .fontSize(12)
      .text(`${exp.date.toDateString()} - ${exp.category} - ${exp.amount} ${exp.currency}`);
  });

  doc.end();

  doc.on("finish", () => {
    res.download(path);
  });
};