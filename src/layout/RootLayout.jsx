import Header from "@/components/user/Header"
import Footer from "@/components/user/Footer"
import Baseheader from "@/components/user/Baseheader"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import { axiosInstance } from "@/config/axiosInstance"
import { useEffect, useState } from "react"
import { clearUser, saveUser } from "@/redux/features/userSlice"

export const RootLayout = () => {
  
    // const [isUserAuth, setisUserAuth] = useState(false)
    const user = useSelector((state) => state.user)
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()
    const location = useLocation()

    const checkUser = async () => {
        try {
            const response = await axiosInstance({ method:"GET",url:"/user/check-user" });
            // console.log(response, "===checkuser response");
            dispatch(saveUser()) 
            setIsLoading(false)
        } catch (error) {
            console.log(error); 
            dispatch(clearUser())      
        }
    }

    useEffect(()=> {
        checkUser()
    },[location?.pathname])

    return isLoading ? null : (
    <>
        {user.isUserAuth ? <Header /> : <Baseheader />}       
        <div className="min-h-72">
         <Outlet/>
        </div>
        <Footer/>
    </>
    )
}