import { useEffect, useState, useMemo } from "react";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseTable from "../components/expense/ExpenseTable";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import * as expenseService from "../services/expense.service";
import * as incomeService from "../services/income.service";
import { currencies } from "../utils/currencyList";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import InfoCard from "../components/ui/InfoCard";
import {
  Wallet,
  Activity,
  PlusCircle,
  X,
  PiggyBank,
  TrendingUp,
  LayoutGrid,
  RefreshCcw,
  Edit3,
  Utensils,
  Plane,
  Receipt,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Film,
  Home,
  Shield,
  Car
} from "lucide-react";


const defaultCategories = [
  { name: "Food", icon: Utensils },
  { name: "Travel", icon: Plane },
  { name: "Bills", icon: Receipt },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Health", icon: HeartPulse },
  { name: "Education", icon: GraduationCap },
  { name: "Entertainment", icon: Film },
  { name: "Rent", icon: Home },
  { name: "Insurance", icon: Shield },
  { name: "Transport", icon: Car },
  { name: "Investment", icon: TrendingUp }
];

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [incomeInput, setIncomeInput] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [source, setSource] = useState("Salary");
  const [history, setHistory] = useState([]);

  const [categoryBudgets, setCategoryBudgets] = useState(
  Object.fromEntries(defaultCategories.map(cat => [cat.name, 0]))
);


  /* ===============================
     FETCH DATA
  =============================== */

  const fetchExpenses = async () => {
    const res = await expenseService.getExpenses();
    setExpenses(res.data.data || []);
  };

  const fetchIncome = async () => {
    const res = await incomeService.getIncome();
    setIncome(res.data.data.amount || 0);
  };

  const fetchHistory = async () => {
    const res = await incomeService.getIncomeHistory();
    setHistory(res.data.data || []);
  };

  useEffect(() => {
    fetchExpenses();
    fetchIncome();
    fetchHistory();
  }, []);

   // 👇 ADD THIS HERE
  useEffect(() => {
    const savedBudgets = localStorage.getItem("categoryBudgets");

    if (savedBudgets) {
      setCategoryBudgets(JSON.parse(savedBudgets));
    }
  }, []);
  

  /* ===============================
     CALCULATIONS
  =============================== */

  const spentPerCategory = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      if (!map[e.category]) map[e.category] = 0;
      map[e.category] += Number(e.amount);
    });
    return map;
  }, [expenses]);

  const totalExpense = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount), 0),
    [expenses]
  );

  const savings = income > totalExpense ? income - totalExpense : 0;

  const totalCategories = new Set(
    expenses.map(e => e.category)
  ).size;

  const symbol =
    currencies.find(c => c.code === currency)?.symbol || "₹";

  /* ===============================
     INCOME HANDLER
  =============================== */

  const handleSetIncome = async () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const amount = Number(incomeInput);
    if (!amount && amount !== 0) return;

    await incomeService.setIncome({
      amount,
      source,
      currency,
      month,
      year
    });

    setIncome(amount);
    setIncomeInput("");
    fetchHistory();
  };

  /* ===============================
     EXPENSE HANDLER
  =============================== */

  const handleSubmit = async data => {
    if (editData) {
      await expenseService.updateExpense(editData._id, data);
    } else {
      await expenseService.createExpense(data);
    }

    setShowModal(false);
    fetchExpenses();
  };

  /* ===============================
     UI
  =============================== */

  return (
    <div className="space-y-10">

      {/* ===== INCOME CARD ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="text-blue-400" />
            <h2 className="text-lg font-semibold">Monthly Income</h2>
          </div>

          <div className="flex gap-3">
            <Edit3
              className="cursor-pointer text-yellow-400"
              onClick={() => setIncomeInput(income)}
            />
            <RefreshCcw
              className="cursor-pointer text-red-400"
              onClick={async () => {
                const month = new Date().getMonth() + 1;
                const year = new Date().getFullYear();

                await incomeService.setIncome({
                  amount: 0,
                  month,
                  year
                });

                setIncome(0);
                fetchHistory();
              }}
            />
          </div>
        </div>

        <div className="text-3xl font-bold text-purple-400 mb-4">
          {symbol}{" "}
          <CountUp end={income} duration={1} separator="," />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="number"
            placeholder="Amount"
            value={incomeInput}
            onChange={e => setIncomeInput(e.target.value)}
            className="p-3 bg-slate-800 rounded-lg"
          />

          <select
            value={source}
            onChange={e => setSource(e.target.value)}
            className="p-3 bg-slate-800 rounded-lg"
          >
            <option>Salary</option>
            <option>Freelance</option>
            <option>Business</option>
            <option>Investment</option>
            <option>Rental</option>
          </select>

          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="p-3 bg-slate-800 rounded-lg"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          <button
            onClick={handleSetIncome}
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg px-4 py-2"
          >
            Save
          </button>
        </div>
      </motion.div>

      {/* ===== HISTORY ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
      >
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="text-green-400" />
          <h2 className="text-lg font-semibold">Income History</h2>
        </div>

        <div className="space-y-3">
          {history.map(item => (
            <div
              key={item._id}
              className="flex justify-between bg-slate-800 p-3 rounded-lg"
            >
              <span>{item.month}/{item.year}</span>
              <span>{item.source}</span>
              <span>{symbol} {item.amount}</span>
              <span>{item.currency}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ===== SUMMARY ===== */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<TrendingUp />}
          title="Total Expense"
          value={totalExpense}
          symbol={symbol}
        />
        <SummaryCard
          icon={<PiggyBank />}
          title="Savings"
          value={savings}
          symbol={symbol}
        />
        <SummaryCard
          icon={<LayoutGrid />}
          title="Total Categories"
          value={totalCategories}
        />
      </div>

      {/* ===== ADD EXPENSE BUTTON ===== */}
      <Button onClick={() => setShowModal(true)}>
        <PlusCircle className="mr-2" size={18} />
        Add Expense
      </Button>


     <InfoCard
  icon={<Wallet className="text-purple-400" />}
  title="Expense Management"
  message="Set category budgets, track spending and monitor remaining balance in real time."
  color="purple"
/>

<div className="h-6" />

<InfoCard
  icon={<Activity className="text-green-400" />}
  title="Live Tracking"
  message="Progress bars update automatically as you add expenses."
  color="green"
/>











      {/* ===== CATEGORY BUDGET GRID ===== */}
      {/* ===== CATEGORY BUDGET GRID ===== */}
<div className="bg-gradient-to-br from-slate-900 via-blue-900/40 to-red-900/40 
                p-8 rounded-3xl border border-white/10 shadow-2xl">

  <div className="flex items-center gap-3 mb-8">
    <LayoutGrid className="text-purple-400" size={22} />
    <h2 className="text-xl font-bold tracking-wide">
      Category Budget Allocation
    </h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {defaultCategories.map((cat, index) => {

      const allocated = categoryBudgets[cat.name] || 0;
      const spent = spentPerCategory[cat.name] || 0;
      const remaining = allocated - spent;

      const percentage =
        allocated > 0
          ? Math.min((spent / allocated) * 100, 100)
          : 0;

      const Icon = cat.icon || Wallet;

      return (
        <div
          key={`${cat.name}-${index}`}
          className="bg-gradient-to-br 
                     from-slate-800 via-blue-800/40 to-red-800/30
                     p-6 rounded-2xl border border-white/10 
                     shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Icon className="text-purple-400" size={18} />
              <span className="font-semibold">{cat.name}</span>
            </div>

            <span className="text-sm text-gray-300">
              {symbol}{spent} / {symbol}{allocated}
            </span>
          </div>

          {/* Budget Input */}
          <input
            type="number"
            placeholder="Set Budget"
            value={allocated}
        onChange={(e) => {
  const updated = {
    ...categoryBudgets,
    [cat.name]: Number(e.target.value)
  };

  setCategoryBudgets(updated);

  // Save in localStorage
  localStorage.setItem("categoryBudgets", JSON.stringify(updated));
}}
            className="w-full p-2 mb-4 bg-slate-900 rounded-lg 
                       border border-white/10 text-sm"
          />

          {/* Progress */}
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
            <div
              style={{ width: `${percentage}%` }}
              className={`h-full rounded-full transition-all duration-500 ${
                percentage > 90
                  ? "bg-red-500"
                  : percentage > 70
                  ? "bg-yellow-400"
                  : "bg-blue-500"
              }`}
            />
          </div>

          {/* Remaining */}
          <div className="mt-3 text-xs text-gray-400">
            Remaining:{" "}
            <span
              className={`${
                remaining < 0
                  ? "text-red-400 font-semibold"
                  : "text-green-400"
              }`}
            >
              {symbol}{remaining}
            </span>
          </div>
        </div>
      );
    })}
  </div>
</div>

      {/* ===== TABLE ===== */}
      <ExpenseTable
        expenses={expenses}
        onDelete={async id => {
          await expenseService.deleteExpense(id);
          fetchExpenses();
        }}
        onEdit={data => {
          setEditData(data);
          setShowModal(true);
        }}
      />

      {/* ===== MODAL ===== */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <PlusCircle /> Add Expense
            </h2>
        
          </div>

          <ExpenseForm
            initialData={editData}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
    </div>
  );
}

/* ===============================
   SUMMARY CARD
=============================== */

function SummaryCard({ icon, title, value, symbol }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
    >
      <div className="text-blue-400 mb-2">{icon}</div>
      <p className="text-sm">{title}</p>
      <p className="text-xl font-bold text-purple-400">
        {symbol ? `${symbol} ` : ""}
        <CountUp end={value} duration={1} separator="," />
      </p>
    </motion.div>
  );
}