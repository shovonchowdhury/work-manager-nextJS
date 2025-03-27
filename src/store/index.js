import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import taskReducer from './slice/taskSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer
  },
});

export default store;
