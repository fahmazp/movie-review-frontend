import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axiosInstance";
import { Button } from "@headlessui/react";
import toast from "react-hot-toast";

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

// block-user & unblock-user -
const handleDeactivate = async (userId) => {
  try {
    await axiosInstance.put(`/admin/block-user/${userId}`);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, isActive: false } : user
      )
    )
    toast.success("User deactivated successfully!")
  } catch (err) {
    toast.error("Failed to deactivate user")
    console.error("Failed to deactivate user", err);
  }
};

const handleActivate = async (userId) => {
  try {
    await axiosInstance.put(`/admin/unblock-user/${userId}`);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, isActive: true } : user
      )
    )
    toast.success("User activated successfully!")
  } catch (err) {
    toast.error("Failed to activate user")
    console.error("Failed to activate user", err);
  }
};


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
              <th className="px-4 py-2 text-center">Action</th>
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

                <td className="px-4 py-2 text-center">
                  {user.isActive ? (
                    <Button className="bg-red-500 text-white p-1 rounded-xs hover:bg-red-800"
                     onClick={() => handleDeactivate(user._id)}
                    >Block user</Button>
                  ) : (
                    <Button className="bg-green-400 text-white p-1 rounded-xs hover:bg-green-700"
                     onClick={() => handleActivate(user._id)}
                    >Unblock user</Button>
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