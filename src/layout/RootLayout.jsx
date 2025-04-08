import Header from "@/components/user/Header"
import Footer from "@/components/user/Footer"
import Baseheader from "@/components/user/Baseheader"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import { axiosInstance } from "@/config/axiosInstance"
import { useEffect } from "react"
import { clearUser, saveUser } from "@/redux/features/userSlice"
import { SpokeSpinner } from "@/components/user/spinner"

export const RootLayout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isUserAuth, isCheckingAuth } = useSelector((state) => state.user);
  
    const checkUser = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/user/check-user",
          withCredentials: true,
        })
        dispatch(saveUser(response.data));
      } catch (error) {
        console.log("checkUser error:", error);
        dispatch(clearUser());
      }
    };
  
    useEffect(() => {
      checkUser();
    }, [location.pathname])
  
    if (isCheckingAuth) return  <div className="flex justify-center items-center h-screen">
                                <SpokeSpinner size="lg" color="yellow" />
                                </div>
  
    return (
      <>
        {isUserAuth ? <Header /> : <Baseheader />}
        <div className="min-h-72">
          <Outlet />
        </div>
        <Footer />
      </>
    );
  };
  