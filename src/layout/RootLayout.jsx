import Header from "@/components/user/Header"
import Footer from "@/components/user/Footer"
import Baseheader from "@/components/user/Baseheader"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import { axiosInstance } from "@/config/axiosInstance"
import { useEffect } from "react"
import { clearUser, saveUser } from "@/redux/features/userSlice"
import { SpokeSpinner } from "@/components/user/spinner"
import { ScrollToTop } from "@/components/user/ScrollToTop"

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
<div
  className="
    fixed top-0 left-0 h-full w-full 
    bg-no-repeat bg-cover bg-center 
    opacity-8 dark:opacity-15 -z-10 
    dark:bg-gradient-to-r dark:from-black dark:via-black/70 dark:to-transparent
    bg-gradient-to-r from-white via-white/50 to-transparent"
    style={{
    backgroundImage: "url('/images/Hexagon-bg.svg')",
    backdropFilter: "blur(4px)"
  }}
/>


        {isUserAuth ? <Header /> : <Baseheader />}
        <ScrollToTop />
          <Outlet />
        <Footer />

        
      </>
    );
  };
  