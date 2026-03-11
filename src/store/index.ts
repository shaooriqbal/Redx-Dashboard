import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import resourcesReducer from './slices/resourcesSlice';
import { financeApi } from '../api/financeApi';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        resources: resourcesReducer,
        [financeApi.reducerPath]: financeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(financeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
