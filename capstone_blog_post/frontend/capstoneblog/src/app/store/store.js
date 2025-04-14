import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../store/blogSlice';

const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

export default store;
