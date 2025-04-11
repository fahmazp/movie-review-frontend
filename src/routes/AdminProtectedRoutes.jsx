import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const AdminProtectedRoutes = () => {
  const { isCheckingAuth, isUserAuth, userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingAuth && (!isUserAuth || userDetails?.role !== "admin")) {
      navigate("/admin/login");
    }
  }, [isCheckingAuth, isUserAuth, userDetails]);

  if (isCheckingAuth) return null;

  return <Outlet />;
};
