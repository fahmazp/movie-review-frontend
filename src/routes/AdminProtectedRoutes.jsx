import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AdminProtectedRoutes = () => {
  const navigate = useNavigate();
  const { isAdminAuth, isCheckingAdminAuth } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!isCheckingAdminAuth && !isAdminAuth) {
      navigate('/admin/login');
    }
  }, [isCheckingAdminAuth, isAdminAuth]);

  if (isCheckingAdminAuth) return null;

  return <Outlet />;
};
