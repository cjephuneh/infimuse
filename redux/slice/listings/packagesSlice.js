import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPackages, getPackage, createPackage, updatePackage, deletePackage } from "./packagesServices";

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  packages: [],
  selectedPackage: null,
};

// Thunk for fetching packages
export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async () => {
    try {
      const response = await getPackages();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for fetching a single package
export const fetchPackage = createAsyncThunk(
  "packages/fetchPackage",
  async (packageId) => {
    try {
      const response = await getPackage(packageId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for creating a package
export const createPackageAsync = createAsyncThunk(
  "packages/createPackage",
  async (packageData) => {
    try {
      const response = await createPackage(packageData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for updating a package
export const updatePackageAsync = createAsyncThunk(
  "packages/updatePackage",
  async (packageData) => {
    try {
      const response = await updatePackage(packageData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for deleting a package
export const deletePackageAsync = createAsyncThunk(
  "packages/deletePackage",
  async (packageId) => {
    try {
      const response = await deletePackage(packageId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Create the package slice
const packagesSlice = createSlice({
    name: "packages",
    initialState,
    reducers: {
      selectPackage: (state, action) => {
        state.selectedPackage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPackages.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.packages = action.payload;
        })
        .addCase(fetchPackages.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(createPackageAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.packages.push(action.payload);
        })
        .addCase(createPackageAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updatePackageAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.packages = state.packages.map((pkg) =>
            pkg.id === action.payload.id ? action.payload : pkg
          );
        })
        .addCase(updatePackageAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deletePackageAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.packages = state.packages.filter((pkg) => pkg.id !== action.payload.id);
        })
        .addCase(deletePackageAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

// Export the package slice actions
export const { selectPackage } = packagesSlice.actions;

// Export the package slice reducer
export default packagesSlice.reducer;
