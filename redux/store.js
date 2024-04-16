// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './slice/auth/authSlice';
import classSessionsReducer from '../redux/slice/listings/classSessionsSlice'; // Import the class sessions reducer
import workshopReducer from './slice/listings/workshopSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  classSessions: classSessionsReducer, // Add the class sessions reducer to the root reducer
  workshop: workshopReducer,
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;
