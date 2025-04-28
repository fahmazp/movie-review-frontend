import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { saveAdmin } from "@/redux/features/adminSlice";
import { axiosInstance } from "@/config/axiosInstance";

export const AdminProtectedRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAdminAuth, isCheckingAdminAuth } = useSelector((state) => state.admin);

  // useEffect(() => {
  //   if (!isCheckingAdminAuth && !isAdminAuth) {
  //     navigate('/admin/login');
  //   }
  // }, [isCheckingAdminAuth, isAdminAuth]);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/check-auth");
        if (data.isAuthenticated) {
          dispatch(saveAdmin(true));
        } else {
          dispatch(saveAdmin(false));
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Error checking admin auth:", error);
        dispatch(saveAdmin(false));
        navigate("/admin/login");
      }
    };

    checkAdminAuth();
  }, []);

  if (isCheckingAdminAuth) return null;

  return <Outlet />;
};
