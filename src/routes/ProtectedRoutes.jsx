import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

export const ProtectedRoutes = () => {

  // const [isUserAuth, setisUserAuth] = useState(false)
  const navigate = useNavigate()
  const { isUserAuth } = useSelector((state) => state.user)
    // console.log(isUserAuth,"user auth");
  
  // useEffect(() => {
  //     if (!isUserAuth) {
  //        navigate('/login')
  //       }
  //   }, [])

    // useEffect(() => {
      if (!isUserAuth) {
        navigate('/login')
      }
    // }, [])
    
    return <Outlet />

}