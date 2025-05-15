import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AdminProtectedRoutes = () => {
  const { isAdminAuth, isCheckingAuth } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingAuth && !isAdminAuth) {
      navigate("/admin/login");
    }
  }, [isCheckingAuth, isAdminAuth]);

  if (isCheckingAuth) return null;

  return <Outlet />;
};
