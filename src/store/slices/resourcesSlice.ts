import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockApi } from '../../api/mockApi';

export interface Resource {
    id: string;
    name: string;
    role: string;
    department: string;
    status: 'Active' | 'On Leave' | 'Inactive';
}

interface ResourcesState {
    items: Resource[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ResourcesState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchResourcesAsync = createAsyncThunk('resources/fetchResources', async () => {
    return await mockApi.fetchResources();
});

export const addResourceAsync = createAsyncThunk('resources/addResource', async (resource: Omit<Resource, 'id'>) => {
    return await mockApi.addResource(resource);
});

export const updateResourceAsync = createAsyncThunk('resources/updateResource', async (resource: Resource) => {
    return await mockApi.updateResource(resource);
});

export const deleteResourceAsync = createAsyncThunk('resources/deleteResource', async (id: string) => {
    return await mockApi.deleteResource(id);
});

const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchResourcesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchResourcesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchResourcesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch resources';
            })
            // Add
            .addCase(addResourceAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update
            .addCase(updateResourceAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(r => r.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Delete
            .addCase(deleteResourceAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(r => r.id !== action.payload);
            });
    },
});

export default resourcesSlice.reducer;
