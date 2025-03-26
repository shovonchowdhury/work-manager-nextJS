import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to log in the user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/login", credentials); // Adjust API endpoint
      return response.data.user; // Assuming response contains user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// ✅ Async thunk to verify if the user is logged in
export const verifyUserLogin = createAsyncThunk(
  "auth/verifyUserLogin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/currentUser"); // Adjust API endpoint
      return response.data.user; // Assuming response contains user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// ✅ Async thunk to log out the user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/logout"); // Call logout API
      return null; // Logout success, clear user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🔹 Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Handle Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store logged-in user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store login error
      })

      // ✅ Handle Verification
      .addCase(verifyUserLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Handle Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; // Clear user on logout
      });
  },
});

export default authSlice.reducer;
