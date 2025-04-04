import Header from "@/components/user/Header"
import Footer from "@/components/user/Footer"
import UserHeader from "@/components/user/Userheader"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

export const RootLayout = () => {
  
    // const [isUserAuth, setisUserAuth] = useState(false)

    const user = useSelector((state) => state.user)
    console.log("user====", user);
    
    return (
    <>
        {user.isUserAuth ? <Header /> : <UserHeader />}       

        {/* <header className="bg-transparent mt-10">
        </header> */}
        <div className="min-h-72">
         <Outlet/>
        </div>
        <Footer/>
    </>
    )
}