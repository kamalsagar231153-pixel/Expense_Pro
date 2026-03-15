// src/components/ui/Loader.jsx

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"
      />
    </div>
  );
}