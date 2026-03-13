import { useGetFinanceDataQuery } from '../api/financeApi';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { DollarSign, TrendingUp, TrendingDown, Wallet, Loader2, ArrowUpRight } from 'lucide-react';

export default function Finance() {
    // Standard RTK Query Hook that gives us `data`, `isLoading`, and `isError` for free
    const { data, isLoading, isError } = useGetFinanceDataQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Fetching financial statements...</p>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-destructive">
                <p>Failed to load financial data. Please try again later.</p>
            </div>
        );
    }

    const { metrics, recentTransactions } = data;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Finance Dashboard</h2>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Live Data
                </div>
            </div>

            {/* Metrics Overview Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-card to-card/50 shadow-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        <div className="p-2 bg-green-500/10 rounded-full">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-card to-card/50 shadow-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
                        <div className="p-2 bg-red-500/10 rounded-full">
                            <TrendingDown className="h-4 w-4 text-red-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${metrics.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <p className="text-xs text-red-500 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> +4.1% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-card to-card/50 shadow-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
                        <div className="p-2 bg-primary/10 rounded-full">
                            <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${metrics.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <p className="text-xs text-primary flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> +18.2% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-card to-card/50 shadow-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Cash on Hand</CardTitle>
                        <div className="p-2 bg-blue-500/10 rounded-full">
                            <Wallet className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${metrics.cashOnHand.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground mt-1">Available liquidity</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions Table */}
            <Card className="shadow-sm border-border/50 overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                    <CardTitle className="text-lg">Recent Transactions</CardTitle>
                    <p className="text-sm text-muted-foreground">Latest financial activities across the organization.</p>
                </CardHeader>
                <CardContent className="p-4">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[120px]">Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentTransactions.map((transaction: any) => (
                                <TableRow key={transaction.id} className="hover:bg-muted/20 transition-colors h-14">
                                    <TableCell className="font-medium text-muted-foreground">{transaction.date}</TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold
                                            ${transaction.type === 'income' ? 'bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}
                                        `}>
                                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center gap-1.5 text-sm
                                            ${transaction.status === 'completed' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}
                                        `}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${transaction.status === 'completed' ? 'bg-green-600 dark:bg-green-400' : 'bg-yellow-600 dark:bg-yellow-400'}`} />
                                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell className={`text-right font-medium ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : ''}`}>
                                        {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
