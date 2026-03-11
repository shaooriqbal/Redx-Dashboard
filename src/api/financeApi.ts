import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Type definitions for our mocked database
export interface FinanceMetrics {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    cashOnHand: number;
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    status: 'completed' | 'pending';
}

export interface FinanceData {
    metrics: FinanceMetrics;
    recentTransactions: Transaction[];
}

// Dummy standard data
const mockDb: FinanceData = {
    metrics: {
        totalRevenue: 1250320.50,
        totalExpenses: 840100.00,
        netProfit: 410220.50,
        cashOnHand: 620500.00,
    },
    recentTransactions: [
        { id: '1', date: '2026-03-10', description: 'Enterprise SaaS Renewal (ACME Corp)', amount: 15400, type: 'income', status: 'completed' },
        { id: '2', date: '2026-03-09', description: 'AWS Cloud Hosting', amount: -6200, type: 'expense', status: 'completed' },
        { id: '3', date: '2026-03-08', description: 'Marketing Campaign Q1', amount: -12500, type: 'expense', status: 'pending' },
        { id: '4', date: '2026-03-07', description: 'Consulting Contract', amount: 8500, type: 'income', status: 'completed' },
        { id: '5', date: '2026-03-05', description: 'Office Supplies', amount: -450, type: 'expense', status: 'completed' },
    ]
};

// We define our API using RTK Query `createApi`.
export const financeApi = createApi({
    reducerPath: 'financeApi',
    // We use a baseQuery that immediately returns a promise with a timeout 
    // to simulate network latency of 1.2 seconds.
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        // Query to get our mock data
        getFinanceData: builder.query<FinanceData, void>({
            queryFn: async () => {
                // Simulate a 1200ms network delay.
                await new Promise(resolve => setTimeout(resolve, 1200));
                return { data: mockDb };
            },
        }),
    }),
});

// RTK Query auto-generates hooks for any endpoints you define!
export const { useGetFinanceDataQuery } = financeApi;
