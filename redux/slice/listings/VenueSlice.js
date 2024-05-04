import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVenues, getVenue, createVenue, updateVenue, deleteVenue } from "./VenueService";

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  venues: [],
  selectedVenue: null,
};

// Thunk for fetching venues
export const fetchVenues = createAsyncThunk(
  'venues/fetchVenues',
  async () => {
    try {
      const response = await getVenues();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for fetching a single venue
export const fetchVenue = createAsyncThunk(
  'venues/fetchVenue',
  async (venueId) => {
    try {
      const response = await getVenue(venueId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for creating a venue
export const createVenueAsync = createAsyncThunk(
  'venues/createVenue',
  async (venueData) => {
    try {
      const response = await createVenue(venueData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for updating a venue
export const updateVenueAsync = createAsyncThunk(
  'venues/updateVenue',
  async (venueData) => {
    try {
      const response = await updateVenue(venueData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for deleting a venue
export const deleteVenueAsync = createAsyncThunk(
  'venues/deleteVenue',
  async (venueId) => {
    try {
      const response = await deleteVenue(venueId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Create a slice
const VenueSlice = createSlice({
  name: 'venues',
  initialState,
  reducers: {
    selectVenue: (state, action) => {
      state.selectedVenue = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = action.payload;
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVenue = action.payload;
      })
      .addCase(fetchVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createVenueAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVenueAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.venues.push(action.payload);
      })
      .addCase(createVenueAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateVenueAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVenueAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.venues.findIndex(venue => venue.id === action.payload.id);
        state.venues[index] = action.payload;
      })
      .addCase(updateVenueAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteVenueAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVenueAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = state.venues.filter(venue => venue.id !== action.payload.id);
      })
      .addCase(deleteVenueAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Export the actions
export const { selectVenue } = VenueSlice.actions;

// Export the reducer
export default VenueSlice.reducer;
