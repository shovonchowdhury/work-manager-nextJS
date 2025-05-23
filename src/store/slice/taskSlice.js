import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios

// Async thunk to fetch tasks from API
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/users/${userId}/tasks`);
      console.log("paise");
      return res.data.tasks; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetState: () => initialState,
    deleteTask: (state, action) => {
      const updatedTasks = state.tasks.filter(task => task._id !== action.payload);
      // If the deleted task was the last one, the UI should still re-render
      state.tasks = updatedTasks;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
