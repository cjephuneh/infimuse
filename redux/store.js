// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './slice/auth/authSlice';
// Import other reducers and middleware if necessary

const rootReducer = combineReducers({
  // Combine reducers
  auth: authReducer,
  // otherState: otherReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;
