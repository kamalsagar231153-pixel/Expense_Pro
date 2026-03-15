import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { Wallet, Sparkles, ShieldCheck } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate("/");
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen
                 bg-gradient-to-br
                 from-[#0f172a] via-[#1e1b4b] to-[#312e81]
                 overflow-hidden"
    >
      {/* Floating Glow Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 
                      bg-purple-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 
                      bg-blue-600/30 rounded-full blur-[120px]" />

      {/* 3D Card */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ rotateX: 4, rotateY: -4 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="relative w-96 p-8 rounded-3xl
                   bg-white/5 backdrop-blur-xl
                   border border-white/10
                   shadow-2xl
                   transform transition-all duration-500"
        style={{ perspective: 1000 }}
      >
        {/* Header Section */}
        <div className="text-center mb-8">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl 
                            bg-gradient-to-r 
                            from-purple-600 to-blue-600
                            shadow-lg">
              <Wallet className="text-white" size={30} />
            </div>
          </div>

          <h1 className="text-3xl font-bold
                         bg-gradient-to-r
                         from-purple-400 to-blue-400
                         bg-clip-text text-transparent">
            Welcome to ExpensePro
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Smart tracking. Better savings.
          </p>
        </div>

        {/* Inputs */}
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          className="w-full mb-4 p-3 rounded-xl
                     bg-slate-900/70
                     border border-white/10
                     focus:border-purple-500
                     outline-none transition"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          className="w-full mb-6 p-3 rounded-xl
                     bg-slate-900/70
                     border border-white/10
                     focus:border-blue-500
                     outline-none transition"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl
                     bg-gradient-to-r
                     from-purple-600 to-blue-600
                     hover:scale-[1.03]
                     transition-all duration-300
                     font-semibold shadow-lg"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          No account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:text-blue-400 transition"
          >
            Register
          </Link>
        </p>

        {/* Bottom Features */}
        <div className="flex justify-between mt-8 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles size={14} />
            Smart Tracking
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            Secure
          </div>
        </div>
      </motion.form>
    </div>
  );
}