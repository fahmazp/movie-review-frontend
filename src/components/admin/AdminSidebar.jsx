import { Link, useLocation } from "react-router-dom";
import { User, LayoutDashboard, LogOut } from "lucide-react";

export const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/admin/profile", label: "Profile", icon: User },
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    
  ];

  return (
    <aside className="w-64 bg-white dark:bg-zinc-800 p-6 border-r dark:border-zinc-700">
      <h1 className="text-2xl font-bold mb-8 text-yellow-500">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
            ${
              location.pathname === to
                ? "bg-yellow-400 text-white"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-yellow-100 dark:hover:bg-zinc-700"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout button */}
      <button className="mt-10 flex items-center gap-2 text-red-500 hover:text-red-600">
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
};
