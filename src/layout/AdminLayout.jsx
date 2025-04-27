import { Outlet, useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const AdminLayout = () => {
  // const { userDetails } = useSelector((state) => state.user);
  const location = useLocation()
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-transparent text-white px-6 py-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
      </header> */}

      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}

      <main className="flex-1 p-6 bg-transparent">
        <Outlet />
      </main>
      </div>  

      <footer className="bg-gray-900 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Honey Popcorn Admin
      </footer>
    </div>
  );
};
