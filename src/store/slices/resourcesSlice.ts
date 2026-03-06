import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Resource {
    id: string;
    name: string;
    role: string;
    department: string;
    status: 'Active' | 'On Leave' | 'Inactive';
}

interface ResourcesState {
    items: Resource[];
}

const initialState: ResourcesState = {
    items: [
        { id: '1', name: 'Alice Smith', role: 'Senior Developer', department: 'Engineering', status: 'Active' },
        { id: '2', name: 'Bob Johnson', role: 'Product Manager', department: 'Product', status: 'Active' },
        { id: '3', name: 'Carol Williams', role: 'Designer', department: 'Design', status: 'On Leave' },
    ],
};

const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        addResource: (state, action: PayloadAction<Resource>) => {
            state.items.push(action.payload);
        },
        removeResource: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addResource, removeResource } = resourcesSlice.actions;
export default resourcesSlice.reducer;
