import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWorkshopClasses,
  fetchWorkshopClass,
  createWorkshopClass,
  updateWorkshopClass,
  deleteWorkshopClass,
} from "./WorkshopClassService";

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  workshopClasses: [],
  selectedWorkshopClass: null,
};

// Thunk for fetching workshop classes
export const fetchWorkshopClassesAsync = createAsyncThunk(
  "workshopClasses/fetchWorkshopClasses",
  async () => {
    try {
      const response = await fetchWorkshopClasses();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for fetching a single workshop class
export const fetchWorkshopClassAsync = createAsyncThunk(
  "workshopClasses/fetchWorkshopClass",
  async (workshopClassId) => {
    try {
      const response = await fetchWorkshopClass(workshopClassId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for creating a workshop class
export const createWorkshopClassAsync = createAsyncThunk(
  "workshopClasses/createWorkshopClass",
  async (workshopClassData) => {
    try {
      const response = await createWorkshopClass(workshopClassData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for updating a workshop class
export const updateWorkshopClassAsync = createAsyncThunk(
  "workshopClasses/updateWorkshopClass",
  async (workshopClassData) => {
    try {
      const response = await updateWorkshopClass(workshopClassData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for deleting a workshop class
export const deleteWorkshopClassAsync = createAsyncThunk(
  "workshopClasses/deleteWorkshopClass",
  async (workshopClassId) => {
    try {
      const response = await deleteWorkshopClass(workshopClassId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Create the WorkshopClassSlice
const WorkshopClassSlice = createSlice({
  name: "workshopClasses",
  initialState,
  reducers: {
    // Add reducers here
    setSelectedWorkshopClass: (state, action) => {
      state.selectedWorkshopClass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add extra reducers here
      .addCase(fetchWorkshopClassesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkshopClassesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopClasses = action.payload;
      })
      .addCase(fetchWorkshopClassesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWorkshopClassAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkshopClassAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedWorkshopClass = action.payload;
      })
      .addCase(fetchWorkshopClassAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createWorkshopClassAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkshopClassAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopClasses.push(action.payload);
      })
      .addCase(createWorkshopClassAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateWorkshopClassAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkshopClassAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.workshopClasses.findIndex(
          (workshopClass) => workshopClass.id === action.payload.id
        );
        if (index !== -1) {
          state.workshopClasses[index] = action.payload;
        }
      })
      .addCase(updateWorkshopClassAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action creators
export const { setSelectedWorkshopClass } = WorkshopClassSlice.actions;

// Export the reducer
export default WorkshopClassSlice.reducer;
