import { SpokeSpinner } from "@/components/user/spinner"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

export const ProtectedRoutes = () => {

  const navigate = useNavigate()
  const { isUserAuth, isCheckingAuth } = useSelector((state) => state.user)
  
    // useEffect(() => {
    //   if (!isCheckingAuth && !isUserAuth) {
    //     navigate('/login')
    //   }
    // }, [isCheckingAuth, isUserAuth])
    
    // if (isCheckingAuth) return <SpokeSpinner/> //Don't render until check is complete

    if (isCheckingAuth) return <SpokeSpinner /> // show something instead of null

    useEffect(() => {
      if (!isCheckingAuth && !isUserAuth) {
        navigate("/login", { replace: true }); // replace to avoid back nav
      }
    }, [isCheckingAuth, isUserAuth]);

    return <Outlet />

}