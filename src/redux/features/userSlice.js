import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    isUserAuth: false,
    isCheckingAuth: true,
  },
  reducers: {
    saveUser: (state, action) => {
        state.isUserAuth = true
        state.userData = action.payload
        state.isCheckingAuth = false
    },
    clearUser: (state) => {
        state.isUserAuth = false
        state.userData = {}
        state.isCheckingAuth = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveUser,clearUser } = userSlice.actions

export default userSlice.reducer