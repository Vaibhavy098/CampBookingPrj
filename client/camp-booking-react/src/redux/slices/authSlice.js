import { createSlice } from "@reduxjs/toolkit";
import {
  decodeToken,
  getTokenRole,
  getTokenEmail,
} from "../../utils/tokenUtils";

const token = localStorage.getItem("token");
const decoded = token ? decodeToken(token) : null;

const initialState = {
  token: token || null,
  userId: decoded?.sub || null,
  email: getTokenEmail(token) || null,
  role: getTokenRole(token) || null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token } = action.payload;
      const decoded = decodeToken(token);
      state.token = token;
      state.userId = decoded?.sub || null;
      state.email = getTokenEmail(token);
      state.role = getTokenRole(token);
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.email = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
