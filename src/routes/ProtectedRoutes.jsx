import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

export const ProtectedRoutes = () => {

  // const [isUserAuth, setisUserAuth] = useState(false)
  const { isUserAuth } = useSelector((state) => state.user)
  const navigate = useNavigate()
    // console.log(isUserAuth,"user auth");
  
  useEffect(() => {
      if (!isUserAuth) {
         navigate('/login')
        }
    }, [])

    // useEffect(() => {
    //   if (!isUserAuth) {
    //     navigate('/login')
    //   }
    // }, [isUserAuth])
    
  return (
    <Outlet />
  )
}