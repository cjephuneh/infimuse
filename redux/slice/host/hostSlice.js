import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentHost, updateCurrentHost } from './hostService';

export const fetchHostAsync = createAsyncThunk(
  'host/fetchHost',
  async (token, { rejectWithValue }) => {
    try {
      return await fetchCurrentHost(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateHostAsync = createAsyncThunk(
  'host/updateHost',
  async ({ hostData, token }, { rejectWithValue }) => {
    try {
      return await updateCurrentHost(hostData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const hostSlice = createSlice({
  name: 'host',
  initialState: {
    currentHost: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHostAsync.fulfilled, (state, action) => {
        state.currentHost = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchHostAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateHostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateHostAsync.fulfilled, (state, action) => {
        state.currentHost = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateHostAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default hostSlice.reducer;
