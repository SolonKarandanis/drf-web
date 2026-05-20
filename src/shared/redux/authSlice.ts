import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface RefreshResponse {
  access: string
}

interface AuthState {
  token: string | null
}

const initialState: AuthState = {
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccesToken(state, action: PayloadAction<RefreshResponse>) {
      state.token = action.payload.access
    },
    logout(state) {
      state.token = null
    },
  },
})

export const { setAccesToken, logout } = authSlice.actions
export default authSlice.reducer
