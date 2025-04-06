import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

export const ProtectedRoutes = () => {

  // const [isUserAuth, setisUserAuth] = useState(false)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user);
  const isUserAuth = user?._id;

  // const { isUserAuth } = useSelector((state) => state.user)
    
  
  // useEffect(() => {
  //     if (!isUserAuth) {
  //        navigate('/login')
  //       }
  //   }, [])

  useEffect(() => {
    if (!isUserAuth) {
      navigate('/login');
    }
  }, [isUserAuth, navigate]);
    
  return <Outlet />;

}