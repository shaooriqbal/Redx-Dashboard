import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import resourcesReducer from './slices/resourcesSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        resources: resourcesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
