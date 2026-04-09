import { Link } from '@inertiajs/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-black flex flex-col md:flex-row font-sans">
            <aside className="w-full md:w-64 bg-black text-white p-6 md:min-h-screen border-r-4 border-black">
                <h1 className="text-3xl font-black mb-10 tracking-tighter uppercase">Peach Cat Admin</h1>
                <nav className="flex flex-col gap-4 text-lg font-bold uppercase tracking-wide">
                    <Link href={route('admin.dashboard')} className="hover:bg-white hover:text-black p-2 transition-colors">Dashboard</Link>
                    <Link href={route('admin.categories.index')} className="hover:bg-white hover:text-black p-2 transition-colors">Categories</Link>
                    <Link href={route('admin.products.index')} className="hover:bg-white hover:text-black p-2 transition-colors">Products</Link>
                    <Link href={route('profile.edit')} className="hover:bg-white hover:text-black p-2 transition-colors">Profile</Link>
                    <Link href={route('logout')} method="post" as="button" className="text-left hover:bg-white hover:text-black p-2 transition-colors">Logout</Link>
                </nav>
            </aside>
            <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-[#f9f9f9]">
                {children}
            </main>
        </div>
    );
}