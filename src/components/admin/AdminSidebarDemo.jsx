import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, LayoutDashboard } from "lucide-react";
import { clearAdmin } from "@/redux/features/adminSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { axiosInstance } from "@/config/axiosInstance";

export const AdminSidebar2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const links = [
    { to: "/admin/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/profile", label: "Profile", icon: User },
  ];

  // const handleLogout = () => {
  //   dispatch(clearAdmin()); // Clear admin from redux
  //   toast.success("Logged out successfully!");
  //   navigate("/admin/login");
  // };
  const handleLogout = async () => {
    try {
      await axiosInstance.get("/user/logout"); // Call backend to destroy session
      dispatch(clearAdmin()) // Clear redux state
      toast.success("Logged out successfully!");
      navigate("/admin/login"); // Redirect
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Try again!");
    }
  };
  
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
      <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all">
        Logout
      </button>
    </aside>
  );
};
