import Footer from "@/components/user/Footer"
import { Outlet } from "react-router-dom"

export const AdminLayout = () => {
  return (
    <div>
       <h1> AdminLayout</h1>
       <Outlet/>
       <Footer/>
    </div>
  )
}