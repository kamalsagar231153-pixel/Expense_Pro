// src/components/ui/Modal.jsx
import { motion } from "framer-motion";

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-white/20 p-6 rounded-2xl w-96"
      >
        <button
          className="float-right text-red-400"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </motion.div>
    </div>
  );
}