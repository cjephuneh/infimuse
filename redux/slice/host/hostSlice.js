import { fetchCurrentHost, updateCurrentHost } from './hostService';
import { createSlice } from '@reduxjs/toolkit';

const hostSlice = createSlice({
    name: 'host',
    initialState: {
        currentHost: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setCurrentHost: (state, action) => {
            state.currentHost = action.payload;
        },
        setHostStatus: (state, action) => {
            state.status = action.payload;
        },
        setHostError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setCurrentHost, setHostStatus, setHostError } = hostSlice.actions;

export const fetchHostAsync = (token) => async (dispatch) => {
    dispatch(setHostStatus('loading'));
    try {
        const host = await fetchCurrentHost(token);
        dispatch(setCurrentHost(host));
        dispatch(setHostStatus('succeeded'));
    } catch (error) {
        dispatch(setHostError(error.message));
        dispatch(setHostStatus('failed'));
    }
}

export const updateHostAsync = (hostData, token) => async (dispatch) => {
    dispatch(setHostStatus('loading'));
    try {
        const updatedHost = await updateCurrentHost(hostData, token);
        dispatch(setCurrentHost(updatedHost));
        dispatch(setHostStatus('succeeded'));
    } catch (error) {
        dispatch(setHostError(error.message));
        dispatch(setHostStatus('failed'));
    }
}

export default hostSlice.reducer;
