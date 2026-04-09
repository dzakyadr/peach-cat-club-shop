import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0_0_#000]">
                <h2 className="text-4xl font-black uppercase mb-4 tracking-tighter">Welcome to HQ</h2>
                <p className="text-xl font-medium">System is operational. You have control over catalog, inventory, and orders.</p>
            </div>
        </AdminLayout>
    );
}