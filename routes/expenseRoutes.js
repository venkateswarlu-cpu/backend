import express from "express";
import { Expense } from "../models/Expense.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Auth middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get expenses
router.get("/", authMiddleware, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.json(expenses);
});

// Add expense
router.post("/", authMiddleware, async (req, res) => {
  const { title, amount, category, date } = req.body;
  const newExpense = new Expense({ title, amount, category, date, user: req.user.id });
  await newExpense.save();
  res.status(201).json(newExpense);
});

// Delete expense
router.delete("/:id", authMiddleware, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
