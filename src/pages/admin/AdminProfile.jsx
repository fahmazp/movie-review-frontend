import React from "react";
import { useSelector } from "react-redux";

export const AdminProfile = () => {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, Admin 👑</h1>
      <p className="text-lg">Name: {userDetails?.name}</p>
      <p className="text-lg">Email: {userDetails?.email}</p>
      <p className="text-lg text-green-600 font-semibold">Role: {userDetails?.role}</p>
    </div>
  );
};
