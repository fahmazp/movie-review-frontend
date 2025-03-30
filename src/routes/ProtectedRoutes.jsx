import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const ProtectedRoutes = () => {

  const [isUserAuth, setisUserAuth] = useState(false)

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