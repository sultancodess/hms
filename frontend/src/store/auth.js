import { createSlice } from "@reduxjs/toolkit";

// Load persisted state from localStorage
const persistedState = JSON.parse(localStorage.getItem("auth")) || {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: persistedState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      // Save the updated state to localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      // Clear auth and user-related data from localStorage
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    },
    // No role management here, so no need for `changeRole` reducer
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
