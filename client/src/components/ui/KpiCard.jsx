import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function KpiCard({
  icon,
  title,
  value,
  symbol = "",
  gradient = "from-purple-600 to-emerald-500"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.4 }}
      className="relative p-6 rounded-3xl 
                 bg-slate-900/70 backdrop-blur-xl
                 border border-white/10 
                 shadow-2xl overflow-hidden"
    >
      {/* Animated Gradient Border */}
      <div className={`absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r ${gradient}`}>
        <div className="h-full w-full rounded-3xl bg-slate-900/90" />
      </div>

      <div className="relative z-10 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-2 text-white">
            {symbol}
            <CountUp end={value} duration={1.2} separator="," />
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}