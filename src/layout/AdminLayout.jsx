import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminLayout = () => {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-transparent text-white px-6 py-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <p className="text-sm">Logged in as: {userDetails?.email}</p>
      </header>

      <main className="flex-1 p-6 bg-transparent">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Honey Popcorn Admin
      </footer>
    </div>
  );
};
