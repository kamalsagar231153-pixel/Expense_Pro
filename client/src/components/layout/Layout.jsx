import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="h-screen flex overflow-hidden
                    bg-gradient-to-br
                    from-[#0f172a] via-[#1e1b4b] to-[#052e16]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-10
                         bg-gradient-to-br
                         from-[#0f172a]/80 via-[#1e1b4b]/60 to-[#052e16]/80
                         backdrop-blur-xl">

          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>

        </main>
      </div>
    </div>
  );
}