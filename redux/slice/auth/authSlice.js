// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from './authService';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (user, thunkAPI) => {
    try {
      const response = await AuthService.signUp(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add login thunk
export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
      try {
        const response = await AuthService.login(userData);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );


const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  };
  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(signUp.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(signUp.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(signUp.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload.message;
          state.user = null;
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload.message;
          state.user = null;
        });
    },
  });
  
  export const { reset } = authSlice.actions;
  export default authSlice.reducer;
