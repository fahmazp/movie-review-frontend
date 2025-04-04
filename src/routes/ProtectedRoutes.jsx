import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

export const ProtectedRoutes = () => {

  // const [isUserAuth, setisUserAuth] = useState(false)
  const { isUserAuth } = useSelector((state) => state.user)
    const navigate = useNavigate()

  useEffect(() => {
      if (!isUserAuth) {
         navigate('/login')
        }
    }, [])

  return (
    <Outlet />
  )
}