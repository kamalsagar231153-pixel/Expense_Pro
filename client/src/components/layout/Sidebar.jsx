import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Settings,
} from "lucide-react";

export default function Sidebar() {

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/"
    },
    {
      name: "Expenses",
      icon: Wallet,
      path: "/expenses"
    },
    {
      name: "Budget",
      icon: Settings,
      path: "/budget"
    }
  ];

  return (
    <div className="w-72 h-screen
                    bg-gradient-to-b
                    from-[#052e16] via-[#1e1b4b] to-[#0f172a]
                    border-r border-purple-500/20
                    shadow-[0_0_60px_rgba(168,85,247,0.2)]
                    p-8">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-12
                     bg-gradient-to-r
                     from-emerald-400 to-purple-400
                     bg-clip-text text-transparent">
        ExpensePro
      </h1>

      {/* Navigation */}
      <nav className="space-y-4">

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-2xl
                 transition-all duration-300 group
                 ${
                   isActive
                     ? "bg-gradient-to-r from-purple-600/30 to-emerald-500/30 border border-purple-500/30 shadow-lg"
                     : "hover:bg-white/5"
                 }`
              }
            >
              <div className="p-3 rounded-xl
                              bg-purple-500/10
                              group-hover:bg-purple-500/20
                              transition">
                <Icon size={20} className="text-purple-400" />
              </div>

              <span className="text-gray-300 group-hover:text-white transition">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>
    </div>
  );
}