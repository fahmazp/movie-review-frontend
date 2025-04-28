import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice' 
import adminReducer  from './features/adminSlice'


export default configureStore({
  reducer: {
    user: userReducer, // Register the auth slice
    admin: adminReducer,
  },
})