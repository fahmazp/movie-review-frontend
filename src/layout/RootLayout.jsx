import Footer from "@/components/user/Footer"
import Header from "@/components/user/Header"
import UserHeader from "@/components/user/Userheader"
import React, { useState } from "react"
import { Outlet } from "react-router-dom"

export const RootLayout = () => {
  
    const [isUserAuth, setisUserAuth] = useState(false)

    return (
    <div>
        {isUserAuth ? <UserHeader /> : <Header />}       

        <header className="bg-transparent shadow-sm mt-10">
        </header>

        <Outlet/>
        <Footer/>
    </div>
    )
}