import { Trash2, Edit, ReceiptText } from "lucide-react";
import { motion } from "framer-motion";

export default function ExpenseTable({ expenses, onDelete, onEdit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-10 p-8 rounded-3xl
                 bg-gradient-to-br
                 from-purple-950 via-purple-900 to-red-900
                 border border-white/10
                 shadow-[0_0_50px_rgba(168,85,247,0.25)]"
    >
      {/* ===== HEADER SECTION ===== */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div
            className="p-3 rounded-xl
                       bg-gradient-to-br
                       from-red-600 to-purple-600
                       shadow-lg"
          >
            <ReceiptText size={22} className="text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Expense Summary
            </h2>
            <p className="text-sm text-gray-300">
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-purple-300 border-b border-white/10">
              <th className="py-4">#</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-400"
                >
                  No expenses added yet
                </td>
              </tr>
            ) : (
              expenses.map((exp, index) => (
                <motion.tr
                  key={exp._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{
                    background:
                      "linear-gradient(to right, rgba(88,28,135,0.4), rgba(127,29,29,0.4))",
                  }}
                  className="border-b border-white/10 transition-all duration-300"
                >
                  {/* Serial */}
                  <td className="py-4 font-bold text-red-400">
                    {index + 1}
                  </td>

                  {/* Amount */}
                  <td className="py-4 text-white font-semibold">
                    {exp.amount} {exp.currency}
                  </td>

                  {/* Category */}
                  <td className="py-4 text-gray-300">
                    {exp.category}
                  </td>

                  {/* Date */}
                  <td className="py-4 text-gray-400">
                    {new Date(exp.date).toDateString()}
                  </td>

                  {/* Actions */}
                  <td className="py-4">
                    <div className="flex justify-center gap-4">
                      <div
                        className="p-2 rounded-lg
                                   bg-blue-600/20
                                   hover:bg-blue-600/40
                                   transition"
                      >
                        <Edit
                          size={18}
                          className="cursor-pointer text-blue-400"
                          onClick={() => onEdit(exp)}
                        />
                      </div>

                      <div
                        className="p-2 rounded-lg
                                   bg-red-600/20
                                   hover:bg-red-600/40
                                   transition"
                      >
                        <Trash2
                          size={18}
                          className="cursor-pointer text-red-400"
                          onClick={() => onDelete(exp._id)}
                        />
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}