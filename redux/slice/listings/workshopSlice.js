import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWorkshops, getWorkshop, createWorkshop, updateWorkshop, deleteWorkshop } from "./workshopService";

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  workshops: [],
  selectedWorkshop: null,
};

// Thunk for fetching workshops
export const fetchWorkshops = createAsyncThunk(
  'workshops/fetchWorkshops',
  async () => {
    try {
      const response = await getWorkshops();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for fetching a single workshop
export const fetchWorkshop = createAsyncThunk(
  'workshops/fetchWorkshop',
  async (workshopId) => {
    try {
      const response = await getWorkshop(workshopId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for creating a workshop
export const createWorkshopAsync = createAsyncThunk(
  'workshops/createWorkshop',
  async (workshopData) => {
    try {
      const response = await createWorkshop(workshopData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for updating a workshop
export const updateWorkshopAsync = createAsyncThunk(
  'workshops/updateWorkshop',
  async (workshopData) => {
    try {
      const response = await updateWorkshop(workshopData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for deleting a workshop
export const deleteWorkshopAsync = createAsyncThunk(
  'workshops/deleteWorkshop',
  async (workshopId) => {
    try {
      const response = await deleteWorkshop(workshopId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Define the workshop slice
const workshopSlice = createSlice({
  name: 'workshops',
  initialState,
  reducers: {
    selectWorkshop: (state, action) => {
      state.selectedWorkshop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkshops.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshops = action.payload;
      })
      .addCase(fetchWorkshops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createWorkshopAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshops.push(action.payload);
      })
      .addCase(createWorkshopAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateWorkshopAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.workshops.findIndex((workshop) => workshop.id === action.payload.id);
        if (index !== -1) {
          state.workshops[index] = action.payload;
        }
      })
      .addCase(updateWorkshopAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteWorkshopAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshops = state.workshops.filter((workshop) => workshop.id !== action.payload.id);
      })
      .addCase(deleteWorkshopAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


// Export the workshop slice actions
export const { selectWorkshop } = workshopSlice.actions;

// Export the workshop slice reducer

export default workshopSlice.reducer;
