import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
}

interface ProductsState {
    items: Product[];
}

const initialState: ProductsState = {
    items: [
        { id: '1', name: 'Premium Widget', category: 'Hardware', price: 99.99, stock: 45 },
        { id: '2', name: 'Cloud Service Pro', category: 'Software', price: 29.99, stock: 999 },
        { id: '3', name: 'Enterprise API', category: 'Software', price: 499.00, stock: 100 },
    ],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
