import { motion } from "framer-motion";

export default function InfoCard({
  icon,
  title,
  message,
  color = "purple"
}) {
  const colorMap = {
    purple: "from-purple-900/60 to-indigo-900/40",
    green: "from-green-900/60 to-emerald-900/40",
    blue: "from-blue-900/60 to-cyan-900/40",
    red: "from-red-900/60 to-pink-900/40"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${colorMap[color]} 
                  p-6 rounded-3xl 
                  border border-white/10 
                  backdrop-blur-lg 
                  shadow-xl`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="p-3 rounded-xl bg-white/10">
          {icon}
        </div>
        <h3 className="text-lg font-bold tracking-wide">
          {title}
        </h3>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">
        {message}
      </p>
    </motion.div>
  );
}