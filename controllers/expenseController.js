import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.json(expenses);
};

export const addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  const expense = await Expense.create({
    title,
    amount,
    category,
    date,
    user: req.user.id,
  });

  res.status(201).json(expense);
};

export const deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
