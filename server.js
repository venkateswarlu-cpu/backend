import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

/* -------------------- Database -------------------- */
connectDB();

/* -------------------- Middleware -------------------- */
app.use(cors({
  origin: "*", // allow all origins (use frontend URL in production)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));

app.use(express.json());

/* -------------------- Routes -------------------- */
app.get("/", (req, res) => {
  res.send("Smart Expense Splitter Backend Running 🚀");
});

app.use("/api/expenses", expenseRoutes);

/* -------------------- Server -------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
