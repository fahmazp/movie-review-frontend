import AdminSidebar from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { Outlet } from "react-router-dom";


export const AdminLayout = () => {
  // const { userDetails } = useSelector((state) => state.user);
  
  return (
    <div className="">
      <div className="fixed top-0 left-0 h-full w-full bg-no-repeat bg-cover bg-center opacity-8 dark:opacity-15 -z-10 
    dark:bg-gradient-to-r dark:from-black dark:via-black/70 dark:to-transparent
    bg-gradient-to-r from-white via-white/50 to-transparent"
    style={{ backgroundImage: "url('/images/Hexagon-bg.svg')", backdropFilter: "blur(4px)"}} />

      <AdminSidebar />
      <div className="lg:flex flex-1 flex-col">
        {/* Top Navbar */}

      <main className="flex-1 p-4 bg-transparent mx-auto">
        <Outlet />
      </main>
      </div>  

      <footer className="bg-gray-900 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Honey Popcorn Admin
      </footer>
    </div>
  );
};
