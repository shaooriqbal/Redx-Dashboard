import type { Product } from '../store/slices/productsSlice';
import type { Resource } from '../store/slices/resourcesSlice';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Initial dummy data
let products: Product[] = [
    { id: '1', name: 'Premium Widget', category: 'Hardware', price: 99.99, stock: 45 },
    { id: '2', name: 'Cloud Service Pro', category: 'Software', price: 29.99, stock: 999 },
    { id: '3', name: 'Enterprise API', category: 'Software', price: 499.00, stock: 100 },
];

let resources: Resource[] = [
    { id: '1', name: 'Alice Smith', role: 'Senior Developer', department: 'Engineering', status: 'Active' },
    { id: '2', name: 'Bob Johnson', role: 'Product Manager', department: 'Product', status: 'Active' },
    { id: '3', name: 'Carol Williams', role: 'Designer', department: 'Design', status: 'On Leave' },
];

export interface Overtime {
    id: string;
    employeeName: string;
    date: string;
    hours: number;
    description: string;
    status: 'Approved' | 'Pending' | 'Rejected';
}

let overtimes: Overtime[] = [
    { id: '1', employeeName: 'Alice Smith', date: '2026-03-10', hours: 4, description: 'Client meeting preparation', status: 'Approved' },
    { id: '2', employeeName: 'Bob Johnson', date: '2026-03-11', hours: 2, description: 'Late night deployment', status: 'Pending' },
    { id: '3', employeeName: 'Carol Williams', date: '2026-03-12', hours: 3, description: 'Design marathon', status: 'Approved' },
    { id: '4', employeeName: 'Alice Smith', date: '2026-03-13', hours: 5, description: 'Debugging session', status: 'Rejected' },
];

export const mockApi = {
    // Products
    fetchProducts: async (): Promise<Product[]> => {
        await delay(800);
        return [...products];
    },
    addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
        await delay(600);
        const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
        products.push(newProduct);
        return newProduct;
    },
    updateProduct: async (updatedProduct: Product): Promise<Product> => {
        await delay(600);
        products = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        return updatedProduct;
    },
    deleteProduct: async (id: string): Promise<string> => {
        await delay(600);
        products = products.filter(p => p.id !== id);
        return id;
    },

    // Resources
    fetchResources: async (): Promise<Resource[]> => {
        await delay(800);
        return [...resources];
    },
    addResource: async (resource: Omit<Resource, 'id'>): Promise<Resource> => {
        await delay(600);
        const newResource = { ...resource, id: Math.random().toString(36).substr(2, 9) };
        resources.push(newResource);
        return newResource;
    },
    updateResource: async (updatedResource: Resource): Promise<Resource> => {
        await delay(600);
        resources = resources.map(r => r.id === updatedResource.id ? updatedResource : r);
        return updatedResource;
    },
    deleteResource: async (id: string): Promise<string> => {
        await delay(600);
        resources = resources.filter(r => r.id !== id);
        return id;
    },

    // Overtimes
    fetchOvertimes: async (): Promise<Overtime[]> => {
        await delay(1000);
        return [...overtimes];
    },
};
