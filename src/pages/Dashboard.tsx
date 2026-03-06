import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Package, Users, DollarSign, Activity } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function Dashboard() {
    const products = useSelector((state: RootState) => state.products.items);
    const resources = useSelector((state: RootState) => state.resources.items);

    const totalProducts = products.length;
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    const activeResources = resources.filter(r => r.status === 'Active').length;
    const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

    const analytics = [
        {
            title: 'Total Revenue Potential',
            value: `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: DollarSign,
            description: 'Based on current stock'
        },
        {
            title: 'Active Resources',
            value: activeResources.toString(),
            icon: Users,
            description: `${resources.length} total team members`
        },
        {
            title: 'Product Catalog',
            value: totalProducts.toString(),
            icon: Package,
            description: 'Unique items available'
        },
        {
            title: 'Total Stock Volume',
            value: totalStock.toLocaleString(),
            icon: Activity,
            description: 'Units currently in inventory'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {analytics.map((metric, i) => {
                    const Icon = metric.icon;
                    return (
                        <Card key={i} className="hover:shadow-lg transition-shadow bg-card border-border/50">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                                <Icon className="w-4 h-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metric.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Placeholder for future charts or more detailed lists */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">System updated</p>
                                    <p className="text-sm text-muted-foreground">Just now</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
