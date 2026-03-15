import { useState, useEffect } from "react";
import { currencies } from "../../utils/currencyList";
import { DollarSign, Tag, Calendar, FileText } from "lucide-react";
import Button from "../ui/Button";

export default function ExpenseForm({ onSubmit, initialData = null }) {
  const [form, setForm] = useState({
    amount: "",
    currency: "INR",
    category: "",
    date: "",
    notes: ""
  });

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setForm({
        amount: initialData.amount || "",
        currency: initialData.currency || "INR",
        category: initialData.category || "",
        date: initialData.date
          ? initialData.date.split("T")[0]
          : "",
        notes: initialData.notes || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
      <h2 className="text-xl font-bold mb-6 text-purple-400">
        {initialData ? "Update Expense" : "Add Expense"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Amount */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 text-blue-400" size={18} />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full pl-10 p-3 bg-slate-900/70 border border-white/10 rounded-xl focus:border-purple-500 outline-none"
          />
        </div>

        {/* Currency */}
        <div>
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="w-full p-3 bg-slate-900/70 border border-white/10 rounded-xl"
          >
            {currencies.map((cur) => (
              <option key={cur.code} value={cur.code}>
                {cur.symbol} {cur.code}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="relative">
          <Tag className="absolute left-3 top-3 text-purple-400" size={18} />
          <input
            type="text"
            name="category"
            placeholder="Category (Food, Travel, Bills...)"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full pl-10 p-3 bg-slate-900/70 border border-white/10 rounded-xl focus:border-purple-500 outline-none"
          />
        </div>

        {/* Date */}
        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-blue-400" size={18} />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full pl-10 p-3 bg-slate-900/70 border border-white/10 rounded-xl focus:border-purple-500 outline-none"
          />
        </div>

        {/* Notes */}
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-purple-400" size={18} />
          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            className="w-full pl-10 p-3 bg-slate-900/70 border border-white/10 rounded-xl focus:border-purple-500 outline-none"
          />
        </div>

        <Button type="submit" className="w-full">
          {initialData ? "Update Expense" : "Add Expense"}
        </Button>

      </form>
    </div>
  );
}