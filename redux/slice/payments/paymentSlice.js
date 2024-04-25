// src/redux/slices/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PaymentService from './PaymentService';

// Async thunk for initializing payment
export const initializePayment = createAsyncThunk(
  'payment/initializePayment',
  async ({ subscription, hostId, callbackUrl }, thunkAPI) => {
    try {
      const response = await PaymentService.initializePayment({ subscription, hostId, callbackUrl });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Payment slice
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  paymentData: null,
  message: '',
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.paymentData = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentData = action.payload;
      })
      .addCase(initializePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
