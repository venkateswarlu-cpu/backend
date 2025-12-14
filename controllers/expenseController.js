import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      date,
    });
    res.status(201).json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error adding expense" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (expense.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    await expense.remove();
    res.json({ message: "Expense deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error deleting expense" });
  }
};
