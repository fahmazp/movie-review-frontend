import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminData: {},
    isAdminAuth: false,
    isCheckingAdminAuth: true,
  },
  reducers: {
    saveAdmin: (state, action) => {
      state.isAdminAuth = true
      state.adminData = action.payload
      state.isCheckingAdminAuth = false
    },
    clearAdmin: (state) => {
      state.isAdminAuth = false
      state.adminData = {}
      state.isCheckingAdminAuth = false
    },
  },
})

// Export actions
export const { saveAdmin, clearAdmin } = adminSlice.actions

// Export reducer
export default adminSlice.reducer
