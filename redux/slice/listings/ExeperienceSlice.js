import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getExperiences, getExperience, createExperience, updateExperience, deleteExperience } from "./ExperienceService";

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  experiences: [],
  selectedExperience: null,
};

// Thunk for fetching experiences
export const fetchExperiences = createAsyncThunk(
  'experiences/fetchExperiences',
  async () => {
    try {
      const response = await getExperiences();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for fetching a single experience
export const fetchExperience = createAsyncThunk(
  'experiences/fetchExperience',
  async (experienceId) => {
    try {
      const response = await getExperience(experienceId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for creating an experience
export const createExperienceAsync = createAsyncThunk(
  'experiences/createExperience',
  async (experienceData) => {
    try {
      const response = await createExperience(experienceData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for updating an experience
export const updateExperienceAsync = createAsyncThunk(
  'experiences/updateExperience',
  async (experienceData) => {
    try {
      const response = await updateExperience(experienceData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for deleting an experience
export const deleteExperienceAsync = createAsyncThunk(
  'experiences/deleteExperience',
  async (experienceId) => {
    try {
      const response = await deleteExperience(experienceId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Create the experience slice
const experienceSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {
    selectExperience(state, action) {
      state.selectedExperience = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedExperience = action.payload;
      })
      .addCase(fetchExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createExperienceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExperienceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences.push(action.payload);
      })
      .addCase(createExperienceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateExperienceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExperienceAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.experiences.findIndex((experience) => experience.id === action.payload.id);
        state.experiences[index] = action.payload;
      })
      .addCase(updateExperienceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteExperienceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExperienceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = state.experiences.filter((experience) => experience.id !== action.payload.id);
      })
      .addCase(deleteExperienceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { selectExperience } = experienceSlice.actions;

export default experienceSlice.reducer;
