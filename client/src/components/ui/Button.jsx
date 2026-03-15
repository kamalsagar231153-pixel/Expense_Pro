// src/components/ui/Button.jsx

import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const base =
    "px-5 py-3 rounded-xl font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 via-purple-600 to-red-500 hover:scale-105",
    danger:
      "bg-gradient-to-r from-red-500 to-purple-600 hover:scale-105",
    outline:
      "border border-purple-500 text-purple-400 hover:bg-purple-500/10",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}