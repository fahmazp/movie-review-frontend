import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

export const ProtectedRoutes = () => {

  // const [isUserAuth, setisUserAuth] = useState(false)
  const navigate = useNavigate()
  const { isUserAuth, isCheckingAuth } = useSelector((state) => state.user)
  
    useEffect(() => {
      if (!isCheckingAuth && !isUserAuth) {
        navigate('/login')
      }
    }, [isCheckingAuth, isUserAuth])
    
    if (isCheckingAuth) return null //Don't render until check is complete

    return <Outlet />

}