// src/redux/slice/classSessionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createClassSession, getClassSession, getClassSessions, updateClassSession, deleteClassSession } from './classService';

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  classSessions: [],
  selectedClassSession: null,
};

// Thunk for fetching class sessions
export const fetchClassSessions = createAsyncThunk(
  'classSessions/fetchClassSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getClassSessions();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


//Thunk for fetching a single class session
export const fetchClassSession = createAsyncThunk(
    'classSessions/fetchClassSession',
    async (classId, { rejectWithValue }) => {
        try {
        const response = await getClassSession(classId);
        return response;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );

    

// Thunk for creating a class session
export const createClassSessionAsync = createAsyncThunk(
  'classSessions/createClassSession',
  async (classData, { rejectWithValue }) => {
    try {
      const response = await createClassSession(classData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for updating a class session
export const updateClassSessionAsync = createAsyncThunk(
  'classSessions/updateClassSession',
  async (classData, { rejectWithValue }) => {
    try {
      const response = await updateClassSession(classData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a class session
export const deleteClassSessionAsync = createAsyncThunk(
  'classSessions/deleteClassSession',
  async (classId, { rejectWithValue }) => {
    try {
      const response = await deleteClassSession(classId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice for managing class sessions
export const classSessionsSlice = createSlice({
  name: 'classSessions',
  initialState,
  reducers: {
    selectClassSession: (state, action) => {
      state.selectedClassSession = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.classSessions = action.payload;
      })
      .addCase(fetchClassSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createClassSessionAsync.fulfilled, (state, action) => {
        state.classSessions.push(action.payload);
      })
      .addCase(updateClassSessionAsync.fulfilled, (state, action) => {
        const index = state.classSessions.findIndex((session) => session.id === action.payload.id);
        if (index !== -1) {
          state.classSessions[index] = action.payload;
        }
      })
      .addCase(deleteClassSessionAsync.fulfilled, (state, action) => {
        state.classSessions = state.classSessions.filter((session) => session.id !== action.payload.id);
      });
  },
});

// Export action creators
export const { selectClassSession } = classSessionsSlice.actions;

// Export the reducer
export default classSessionsSlice.reducer;
