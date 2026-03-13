import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockApi, type Overtime } from '../api/mockApi';
import {
    Clock,
    Search,
    Filter,
    CheckCircle2,
    Timer,
    XCircle,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Overtimes() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const { data: overtimes, isLoading, error } = useQuery<Overtime[]>({
        queryKey: ['overtimes'],
        queryFn: mockApi.fetchOvertimes,
    });

    const filteredOvertimes = overtimes?.filter(item => {
        const matchesSearch = item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status: Overtime['status']) => {
        switch (status) {
            case 'Approved': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case 'Pending': return <Timer className="w-4 h-4 text-amber-500" />;
            case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />;
            default: return null;
        }
    };

    const getStatusStyles = (status: Overtime['status']) => {
        switch (status) {
            case 'Approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'Rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return '';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Over Times</h2>
                    <p className="text-muted-foreground">Track and manage employee overtime requests.</p>
                </div>
                <Button className="shrink-0">
                    <Clock className="w-4 h-4 mr-2" />
                    New Request
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by employee or description..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <select
                            className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground bg-card/50 rounded-xl border border-dashed">
                    <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                    <p>Loading overtime records...</p>
                </div>
            ) : error ? (
                <div className="h-64 flex flex-col items-center justify-center text-destructive bg-destructive/10 rounded-xl border border-destructive/20">
                    <AlertCircle className="h-8 w-8 mb-4" />
                    <p>Error loading data. Please try again.</p>
                </div>
            ) : filteredOvertimes && filteredOvertimes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredOvertimes.map((item) => (
                        <div key={item.id} className="group relative overflow-hidden bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{item.employeeName}</h3>
                                    <p className="text-sm text-muted-foreground">{item.date}</p>
                                </div>
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${getStatusStyles(item.status)}`}>
                                    {getStatusIcon(item.status)}
                                    {item.status}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {item.hours}
                                    </div>
                                    <span className="text-muted-foreground font-medium">Hours clocked</span>
                                </div>
                                <p className="text-sm line-clamp-2 italic text-muted-foreground/80">
                                    "{item.description}"
                                </p>
                            </div>

                            <div className="mt-5 pt-4 border-t border-border/50 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm">Details</Button>
                                <Button variant="outline" size="sm">Edit</Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground bg-card/50 rounded-xl border border-dashed">
                    <Clock className="h-8 w-8 mb-4 opacity-20" />
                    <p>No overtime records found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
