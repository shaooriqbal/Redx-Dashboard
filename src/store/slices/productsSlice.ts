import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockApi } from '../../api/mockApi';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
}

interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchProductsAsync = createAsyncThunk('products/fetchProducts', async () => {
    return await mockApi.fetchProducts();
});

export const addProductAsync = createAsyncThunk('products/addProduct', async (product: Omit<Product, 'id'>) => {
    return await mockApi.addProduct(product);
});

export const updateProductAsync = createAsyncThunk('products/updateProduct', async (product: Product) => {
    return await mockApi.updateProduct(product);
});

export const deleteProductAsync = createAsyncThunk('products/deleteProduct', async (id: string) => {
    return await mockApi.deleteProduct(id);
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            })
            // Add
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Delete
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
            });
    },
});

export default productsSlice.reducer;
