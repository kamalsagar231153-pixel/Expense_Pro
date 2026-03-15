import { useEffect, useState, useMemo } from "react";
import * as expenseService from "../services/expense.service";
import * as incomeService from "../services/income.service";
import InfoCard from "../components/ui/InfoCard";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import KpiCard from "../components/ui/KpiCard";
import FloatingGlow from "../components/ui/FloatingGlow";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  Wallet,
  Sparkles,
  TrendingUp,
  PieChart as PieIcon,
} from "lucide-react";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);

  /* ===============================
     FETCH DATA
  =============================== */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const expRes = await expenseService.getExpenses();
      const incRes = await incomeService.getIncome();

      setExpenses(expRes.data.data || []);
      setIncome(incRes.data.data?.amount || 0);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  
   





  /* ===============================
     CALCULATIONS
  =============================== */

  const totalExpense = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount), 0),
    [expenses]
  );

  const savings = income - totalExpense;

  const budgetUsage =
    income > 0
      ? Math.min(Math.round((totalExpense / income) * 100), 100)
      : 0;

  /* ===============================
     PIE DATA
  =============================== */

  const categoryData = useMemo(() => {
    const map = {};

    expenses.forEach((e) => {
      if (!map[e.category]) map[e.category] = 0;
      map[e.category] += Number(e.amount);
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  }, [expenses]);

  const COLORS = [
    "#10b981", // green
    "#8b5cf6", // purple
    "#ef4444", // red
    "#3b82f6",
    "#f59e0b",
    "#ec4899",
  ];

  /* ===============================
     BAR DATA
  =============================== */

  const monthlyData = useMemo(() => {
    const map = {};

    expenses.forEach((e) => {
      const month = new Date(e.date).toLocaleString("default", {
        month: "short",
      });

      if (!map[month]) map[month] = 0;
      map[month] += Number(e.amount);
    });

    return Object.keys(map).map((key) => ({
      month: key,
      amount: map[key],
    }));
  }, [expenses]);

  /* ===============================
     UI
  =============================== */

  return (
    <div className="relative min-h-screen overflow-hidden">

       <div className="grid md:grid-cols-3 gap-6 mb-10">

  <InfoCard
    icon={<Sparkles className="text-purple-400" />}
    title="Welcome Back!"
    message="Track your expenses, analyze spending patterns and improve your savings habits effortlessly."
    color="purple"
  />

  <InfoCard
    icon={<TrendingUp className="text-green-400" />}
    title="Smart Insights"
    message="Visual charts below help you understand where your money is going this month."
    color="green"
  />

  <InfoCard
    icon={<PieChart className="text-blue-400" />}
    title="Financial Overview"
    message="Keep your budget under control and stay ahead of your financial goals."
    color="blue"
  />

</div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Total Balance */}
        <div className="rounded-3xl p-8
                        bg-gradient-to-br from-[#0f172a] via-[#052e16] to-[#0f172a]
                        border border-emerald-500/20
                        shadow-[0_0_40px_rgba(16,185,129,0.25)]">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Balance</p>
              <h2 className="text-3xl font-bold text-emerald-400 mt-3">
                ₹ {savings}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10">
              <Wallet className="text-emerald-400" size={28} />
            </div>
          </div>
        </div>

        {/* Monthly Spending */}
        <div className="rounded-3xl p-8
                        bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a]
                        border border-purple-500/20
                        shadow-[0_0_40px_rgba(168,85,247,0.25)]">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Monthly Spending</p>
              <h2 className="text-3xl font-bold text-purple-400 mt-3">
                ₹ {totalExpense}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/10">
              <TrendingUp className="text-purple-400" size={28} />
            </div>
          </div>
        </div>

        {/* Budget Usage */}
        <div className="rounded-3xl p-8
                        bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]
                        border border-blue-500/20
                        shadow-[0_0_40px_rgba(59,130,246,0.25)]">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Budget Usage</p>
              <h2 className="text-3xl font-bold text-blue-400 mt-3">
                {budgetUsage}%
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10">
              <PieIcon className="text-blue-400" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= CHART SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Category Distribution */}
        <div className="rounded-3xl p-10
                        bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a]
                        border border-purple-500/20
                        shadow-[0_0_60px_rgba(168,85,247,0.2)]">

          <h2 className="text-2xl font-semibold text-white mb-8">
            Category Distribution
          </h2>

          {categoryData.length === 0 ? (
            <p className="text-gray-400">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={4}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Monthly Trend */}
        <div className="rounded-3xl p-10
                        bg-gradient-to-br from-[#0f172a] via-[#052e16] to-[#0f172a]
                        border border-emerald-500/20
                        shadow-[0_0_60px_rgba(16,185,129,0.2)]">

          <h2 className="text-2xl font-semibold text-white mb-8">
            Monthly Spending Trend
          </h2>

          {monthlyData.length === 0 ? (
            <p className="text-gray-400">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar
                  dataKey="amount"
                  fill="#10b981"
                  radius={[12, 12, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>

    </div>
  );
}