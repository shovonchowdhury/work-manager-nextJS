// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an async thunk for verifying the user's login status
export const verifyUserLogin = createAsyncThunk(
  'auth/verifyUserLogin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/currentUser'); // Adjust the API endpoint to your server
      return response.data.user; // Assuming response contains user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors from the API
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; // Clear user data when logging out
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUserLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set user data on successful login verification
      })
      .addCase(verifyUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message if verification fails
      });
  },
});

// Export the reducer and actions
export const { logout } = authSlice.actions;
export default authSlice.reducer;
