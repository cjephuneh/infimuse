import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createWorkshop, getWorkshops,getWorkshop, updateWorkshop, deleteWorkshop } from './workshopService';

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
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWorkshops();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


//Thunk for fetching a single workshop

export const fetchWorkshop = createAsyncThunk(
    'workshops/fetchWorkshop',
    async (workshopId, { rejectWithValue }) => {
        try {
        const response = await getWorkshop(workshopId);
        return response;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );
    


// Thunk for creating a workshop
export const createWorkshopAsync = createAsyncThunk(
  'workshops/createWorkshop',
  async (workshopData, { rejectWithValue }) => {
    try {
      const response = await createWorkshop(workshopData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for updating a workshop
export const updateWorkshopAsync = createAsyncThunk(
  'workshops/updateWorkshop',
  async (workshopData, { rejectWithValue }) => {
    try {
      const response = await updateWorkshop(workshopData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a workshop

export const deleteWorkshopAsync = createAsyncThunk(
    'workshops/deleteWorkshop',
    async (workshopId, { rejectWithValue }) => {
        try {
        const response = await deleteWorkshop(workshopId);
        return response;
        } catch (error) {
        return rejectWithValue(error.message);
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
  extraReducers: {
    [fetchWorkshops.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchWorkshops.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.workshops = action.payload.doc;
    },
    [fetchWorkshops.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createWorkshopAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createWorkshopAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.workshops.push(action.payload.doc);
    },
    [createWorkshopAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateWorkshopAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateWorkshopAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      const index = state.workshops.findIndex((workshop) => workshop._id === action.payload.doc._id);
      if (index !== -1) {
        state.workshops[index] = action.payload.doc;
      }
    },
    [updateWorkshopAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteWorkshopAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteWorkshopAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.workshops = state.workshops.filter((workshop) => workshop._id !== action.payload.doc._id);
    },
    [deleteWorkshopAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the action creators
export const { selectWorkshop } = workshopSlice.actions;

// Export the workshop slice
export default workshopSlice.reducer;