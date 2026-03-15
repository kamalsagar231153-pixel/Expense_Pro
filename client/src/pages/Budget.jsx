import { useEffect, useState } from "react";
import * as budgetService from "../services/budget.service";
import InfoCard from "../components/ui/InfoCard";
import {
  Target,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import CountUp from "react-countup";

export default function Budget() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(null);

  /* ===============================
     FETCH STATUS
  =============================== */
  const fetchStatus = async () => {
    try {
      const res = await budgetService.getBudgetStatus();
      setStatus(res.data.data);
    } catch (error) {
      console.error("Budget fetch error:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);


  
  





  /* ===============================
     SAVE BUDGET
  =============================== */
  const handleSubmit = async () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    if (!amount) return;

    await budgetService.setBudget({ month, year, amount });
    setAmount("");
    fetchStatus();
  };

  /* ===============================
     CALCULATIONS
  =============================== */
  const usagePercent =
    status && status.budget > 0
      ? Math.min(
          Math.round((status.spent / status.budget) * 100),
          100
        )
      : 0;

  const remaining =
    status && status.budget
      ? status.budget - status.spent
      : 0;

  let statusText = "Safe";
  let statusColor = "text-green-400";
  let StatusIcon = ShieldCheck;

  if (usagePercent > 80) {
    statusText = "Warning";
    statusColor = "text-yellow-400";
    StatusIcon = AlertTriangle;
  }

  if (usagePercent >= 100) {
    statusText = "Over Budget";
    statusColor = "text-red-400";
    StatusIcon = AlertTriangle;
  }

  /* ===============================
     UI
  =============================== */

  return (
    <div className="space-y-12">

      <InfoCard
  icon={<ShieldCheck className="text-green-400" />}
  title="Budget Protection"
  message="Set your monthly budget and get alerts when spending approaches the limit."
  color="green"
/>

<div className="h-6" />

<InfoCard
  icon={<AlertTriangle className="text-red-400" />}
  title="Spending Warning"
  message="If your expenses exceed safe limits, you'll receive visual alerts."
  color="red"
/>

      {/* ================= HEADER CARD ================= */}
      <div className="rounded-3xl p-10
                      bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#052e16]
                      border border-purple-500/20
                      shadow-[0_0_60px_rgba(168,85,247,0.2)]">

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-purple-500/10">
            <Target className="text-purple-400" size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Monthly Budget Setup
          </h2>
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Set Monthly Budget"
            className="flex-1 p-4 rounded-xl
                       bg-slate-900 border border-white/10"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="px-8 rounded-xl
                       bg-gradient-to-r
                       from-purple-600 to-emerald-500
                       hover:opacity-90 transition"
          >
            Save
          </button>
        </div>
      </div>

      {/* ================= STATUS SECTION ================= */}
      {status && (
        <div className="rounded-3xl p-10
                        bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]
                        border border-emerald-500/20
                        shadow-[0_0_60px_rgba(16,185,129,0.2)]">

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

            {/* Budget */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-white/10">
              <p className="text-gray-400 text-sm">Budget</p>
              <h3 className="text-2xl font-bold text-purple-400 mt-2">
                ₹{" "}
                <CountUp
                  end={status.budget}
                  duration={1}
                  separator=","
                />
              </h3>
            </div>

            {/* Spent */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-white/10">
              <p className="text-gray-400 text-sm">Spent</p>
              <h3 className="text-2xl font-bold text-red-400 mt-2">
                ₹{" "}
                <CountUp
                  end={status.spent}
                  duration={1}
                  separator=","
                />
              </h3>
            </div>

            {/* Remaining */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-white/10">
              <p className="text-gray-400 text-sm">Remaining</p>
              <h3
                className={`text-2xl font-bold mt-2 ${
                  remaining < 0
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                ₹{" "}
                <CountUp
                  end={remaining}
                  duration={1}
                  separator=","
                />
              </h3>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div>
            <div className="flex justify-between mb-2 text-sm text-gray-400">
              <span>Usage</span>
              <span>{usagePercent}%</span>
            </div>

            <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden">
              <div
                style={{ width: `${usagePercent}%` }}
                className={`h-full transition-all duration-700 ${
                  usagePercent > 80
                    ? "bg-red-500"
                    : usagePercent > 60
                    ? "bg-yellow-400"
                    : "bg-emerald-500"
                }`}
              />
            </div>
          </div>

          {/* STATUS TEXT */}
          <div
            className={`mt-6 flex items-center gap-3 ${statusColor}`}
          >
            <StatusIcon size={20} />
            <span className="font-medium">
              {statusText}
            </span>
          </div>

        </div>
      )}
    </div>
  );
}