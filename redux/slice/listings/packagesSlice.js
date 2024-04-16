import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPackage, getPackages, getaPackage, updatePackage, deletePackage } from "./packagesServices";

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
    async (_, { rejectWithValue }) => {
        try {
        const response = await getPackages();
        return response;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );

//Thunk for fetching a single package

export const fetchPackage = createAsyncThunk(
    "packages/fetchPackage",

    async (packageId, { rejectWithValue }) => {
        try {
        const response = await getaPackage(packageId);
        return response;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );


// Thunk for creating a package
export const createPackageAsync = createAsyncThunk(
    "packages/createPackage",
    async (packageData, { rejectWithValue }) => {
        try {
        const response = await createPackage(packageData);
        return response;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );

// Thunk for updating a package

export const updatePackageAsync = createAsyncThunk(
    "packages/updatePackage",
    async (packageData, { rejectWithValue }) => {
        try {
        const response = await updatePackage(packageData);
        return response;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );

// Thunk for deleting a package

export const deletePackageAsync = createAsyncThunk(
    "packages/deletePackage",
    async (packageId, { rejectWithValue }) => {
        try {
        const response = await deletePackage(packageId);
        return response;
        } catch (error) {
        return rejectWithValue(error.message);
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
    extraReducers: {
        [fetchPackages.pending]: (state) => {
        state.loading = true;
        },
        [fetchPackages.fulfilled]: (state, action) => {
        state.loading = false;
        state.packages = action.payload;
        },
        [fetchPackages.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        [createPackageAsync.pending]: (state) => {
        state.loading = true;
        },
        [createPackageAsync.fulfilled]: (state, action) => {
        state.loading = false;
        state.packages.push(action.payload);
        },
        [createPackageAsync.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        [updatePackageAsync.pending]: (state) => {
        state.loading = true;
        },
        [updatePackageAsync.fulfilled]: (state, action) => {
        state.loading = false;
        state.packages = state.packages.map((pkg) =>
            pkg.id === action.payload.id ? action.payload : pkg
        );
        },
        [updatePackageAsync.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        [deletePackageAsync.pending]: (state) => {
        state.loading = true;
        },
        [deletePackageAsync.fulfilled]: (state, action) => {
        state.loading = false;
        state.packages = state.packages.filter(
            (pkg) => pkg.id !== action.payload.id
        );
        },
        [deletePackageAsync.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    },
});

// Export the package slice actions
export const { selectPackage } = packagesSlice.actions;

// Export the package slice reducer
export default packagesSlice.reducer;
