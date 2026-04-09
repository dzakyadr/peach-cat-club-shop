import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ categories }: { categories: any[] }) {
    const { delete: destroy } = useForm();
    
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(route('admin.categories.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Categories" />
            <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-4">
                <h1 className="text-5xl font-black uppercase tracking-tighter">Categories</h1>
                <Link href={route('admin.categories.create')} className="bg-black text-white px-6 py-3 font-bold uppercase hover:bg-white hover:text-black border-4 border-black transition-colors">
                    + New Category
                </Link>
            </div>

            <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black text-white uppercase font-bold text-lg">
                            <th className="p-4 border-b-4 border-black">ID</th>
                            <th className="p-4 border-b-4 border-black">Name</th>
                            <th className="p-4 border-b-4 border-black">Slug</th>
                            <th className="p-4 border-b-4 border-black text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c) => (
                            <tr key={c.id} className="border-b-4 border-black last:border-b-0 hover:bg-gray-100 font-medium">
                                <td className="p-4 border-r-4 border-black">{c.id}</td>
                                <td className="p-4 border-r-4 border-black">{c.name}</td>
                                <td className="p-4 border-r-4 border-black">{c.slug}</td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <Link href={route('admin.categories.edit', c.id)} className="bg-black text-white px-4 py-2 uppercase font-bold hover:bg-white hover:text-black border-2 border-black">Edit</Link>
                                    <button onClick={() => handleDelete(c.id)} className="bg-red-600 text-white px-4 py-2 uppercase font-bold hover:bg-white hover:text-red-600 border-2 border-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center font-bold text-xl uppercase">No categories found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}