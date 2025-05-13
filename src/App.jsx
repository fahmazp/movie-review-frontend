import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clearUser, saveUser } from './redux/features/userSlice';
import { clearAdmin, saveAdmin } from './redux/features/adminSlice';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    const userInfo = localStorage.getItem('userInfo');
  
    const cookieExists = document.cookie.includes('token=');
    if (!cookieExists && userInfo) {
      localStorage.removeItem('userInfo');
      dispatch(clearUser());
    }

    // if (adminInfo) {
    //   dispatch(clearUser());
    //   dispatch(saveAdmin(JSON.parse(adminInfo)));
    // } else if (userInfo) {
    //   dispatch(clearAdmin());
    //   dispatch(saveUser(JSON.parse(userInfo)));
    // }
    if (adminInfo && cookieExists) {
      dispatch(clearUser());
      dispatch(saveAdmin(JSON.parse(adminInfo)));
    } else if (userInfo && cookieExists) {
      dispatch(clearAdmin());
      dispatch(saveUser(JSON.parse(userInfo)));
    }

  }, []);
  

  return (
    <>
    <RouterProvider router={router} />
    <Toaster position="bottom-center" reverseOrder={true}/>
    </>
  )
}

export default App
