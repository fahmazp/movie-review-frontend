import Footer from "@/components/user/Footer"
import { Outlet } from "react-router-dom"

export const AdminLayout = () => {
  return (
    <div className="mt-3">
       <h1 className="text-center text-2xl"> Login as Admin</h1>
       <Outlet/>
       <Footer/>
    </div>
  )
}