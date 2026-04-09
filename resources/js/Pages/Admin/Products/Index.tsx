import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ products }: { products: any[] }) {
    const { delete: destroy } = useForm();
    
    const handleDelete = (id: number) => {
        if (confirm('Delete this product entirely?')) {
            destroy(route('admin.products.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Products" />
            <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-4">
                <h1 className="text-5xl font-black uppercase tracking-tighter">Products</h1>
                <Link href={route('admin.products.create')} className="bg-black text-white px-6 py-3 font-bold uppercase hover:bg-white hover:text-black border-4 border-black transition-colors">
                    + New Product
                </Link>
            </div>

            <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-black text-white uppercase font-bold text-lg">
                            <th className="p-4 border-b-4 border-black">Code</th>
                            <th className="p-4 border-b-4 border-black">Name & Color</th>
                            <th className="p-4 border-b-4 border-black">Category</th>
                            <th className="p-4 border-b-4 border-black">Price</th>
                            <th className="p-4 border-b-4 border-black">Status</th>
                            <th className="p-4 border-b-4 border-black text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id} className="border-b-4 border-black last:border-b-0 hover:bg-gray-100 font-medium">
                                <td className="p-4 border-r-4 border-black font-black">{p.style_code}</td>
                                <td className="p-4 border-r-4 border-black">
                                    <Link href={route('admin.products.show', p.id)} className="underline font-bold hover:text-blue-600">
                                        {p.name} - {p.color}
                                    </Link>
                                </td>
                                <td className="p-4 border-r-4 border-black">{p.category?.name}</td>
                                <td className="p-4 border-r-4 border-black">Rp {Number(p.price).toLocaleString('id-ID')}</td>
                                <td className="p-4 border-r-4 border-black">
                                    {p.is_published ? <span className="bg-green-300 border-2 border-black px-2 py-1 uppercase text-sm font-black">Live</span> : <span className="bg-yellow-300 border-2 border-black px-2 py-1 uppercase text-sm font-black">Draft</span>}
                                </td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <Link href={route('admin.products.show', p.id)} className="bg-blue-600 text-white px-4 py-2 uppercase font-bold hover:bg-white hover:text-blue-600 border-2 border-blue-600">Variants</Link>
                                    <Link href={route('admin.products.edit', p.id)} className="bg-black text-white px-4 py-2 uppercase font-bold hover:bg-white hover:text-black border-2 border-black">Edit</Link>
                                    <button onClick={() => handleDelete(p.id)} className="bg-red-600 text-white px-4 py-2 uppercase font-bold hover:bg-white hover:text-red-600 border-2 border-red-600">Del</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}