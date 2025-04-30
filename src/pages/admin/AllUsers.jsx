import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "@/config/axiosInstance";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const res = await axios.get("/api/admin/all-users", { withCredentials: true });
        const res = await axiosInstance.get("/admin/all-users")
        setUsers(res.data.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users Dashboard</h2>
      <div className="overflow-x-auto rounded border border-amber-500">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-200 dark:bg-gray-950">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t bg-gray-100 dark:bg-gray-900">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.mobile}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  {user.isActive ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>  
      <p className="mt-4 text-sm sm:text-base font-bold">
      Total users: <span className="">{users.length}</span>
      </p>
      </div>
      
    </div>
  );
};

export default UsersDashboard;