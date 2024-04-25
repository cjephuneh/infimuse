// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './slice/auth/authSlice';
import classSessionsReducer from '../redux/slice/listings/classSessionsSlice'; // Import the class sessions reducer
import workshopReducer from './slice/listings/workshopSlice';
import packagesReducer from './slice/listings/packagesSlice';
import paymentReducer from './slice/payments/paymentSlice'; // Import the payment reducer

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  classSessions: classSessionsReducer,
  workshop: workshopReducer, // Add the workshop reducer to the root reducer
  payment: paymentReducer, // Add the workshop reducer to the root reducer
  packages: packagesReducer, // Add the packages reducer to the root reducer
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;
