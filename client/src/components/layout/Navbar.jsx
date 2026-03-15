import { LogOut, User } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="h-20 px-10 flex items-center justify-between
                    bg-gradient-to-r
                    from-[#0f172a] via-[#1e1b4b] to-[#052e16]
                    border-b border-purple-500/20
                    shadow-[0_0_40px_rgba(168,85,247,0.2)]">

      {/* Left Title */}
      <h2 className="text-xl font-semibold
                     bg-gradient-to-r
                     from-emerald-400 to-purple-400
                     bg-clip-text text-transparent">
        ExpensePro Dashboard
      </h2>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Profile Card */}
        <div className="flex items-center gap-3
                        px-4 py-2 rounded-xl
                        bg-white/5 border border-white/10">
          <User size={18} className="text-purple-400" />
          <span className="text-sm text-gray-300">
            Welcome Back
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2
                     px-5 py-2 rounded-xl
                     bg-gradient-to-r
                     from-purple-600 to-emerald-500
                     hover:scale-105 hover:shadow-lg
                     transition-all duration-300"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}