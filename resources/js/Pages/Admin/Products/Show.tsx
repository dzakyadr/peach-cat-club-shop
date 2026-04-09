import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Show({ product }: { product: any }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.id,
        size: '',
        stock: '',
    });
    
    const { delete: destroy } = useForm();

    const submitVariant = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.variants.store'), {
            onSuccess: () => reset('size', 'stock'),
        });
    };

    const handleDeleteVariant = (id: number) => {
        if (confirm('Delete this size variant?')) {
            destroy(route('admin.variants.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Variants: ${product.name}`} />
            
            <div className="mb-8">
                <Link href={route('admin.products.index')} className="text-black font-bold uppercase underline hover:text-gray-600">&larr; Back to Products</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]">
                    {product.images?.[0] && (
                        <div className="w-full aspect-[4/5] border-4 border-black overflow-hidden mb-6">
                             <img src={`/storage/${product.images[0].path}`} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">{product.name}</h1>
                    <p className="font-bold text-xl mb-1 mt-4">Code: <span className="font-medium">{product.style_code}</span></p>
                    <p className="font-bold text-xl mb-1">Color: <span className="font-medium">{product.color}</span></p>
                    <p className="font-bold text-xl mb-1">Category: <span className="font-medium">{product.category?.name}</span></p>
                    <p className="font-bold text-xl mb-1">Price: <span className="font-medium">Rp {Number(product.price).toLocaleString('id-ID')}</span></p>
                    <div className="mt-6">
                        <Link href={route('admin.products.edit', product.id)} className="block text-center bg-black text-white py-3 font-bold uppercase border-2 border-black hover:bg-white hover:text-black">Edit Details</Link>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="border-4 border-black bg-white shadow-[8px_8px_0_0_#000]">
                        <h2 className="bg-black text-white p-4 text-2xl font-black uppercase">Size Variants Inventory</h2>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-4 border-black font-bold uppercase">
                                    <th className="p-4">Size</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.variants?.map((v: any) => (
                                    <tr key={v.id} className="border-b-4 border-black last:border-b-0 hover:bg-gray-100 font-medium">
                                        <td className="p-4 text-xl border-r-4 border-black">{v.size}</td>
                                        <td className="p-4 text-xl border-r-4 border-black font-black">{v.stock}</td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handleDeleteVariant(v.id)} className="bg-red-600 text-white px-4 py-2 uppercase font-bold hover:bg-white hover:text-red-600 border-2 border-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {(!product.variants || product.variants.length === 0) && (
                                    <tr><td colSpan={3} className="p-6 text-center font-bold text-lg">No variants added yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]">
                        <h3 className="text-2xl font-black uppercase mb-4">Add Variant</h3>
                        <form onSubmit={submitVariant} className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 w-full">
                                <label className="block font-bold uppercase mb-2">Size (e.g. S, M, L, XL)</label>
                                <input type="text" value={data.size} onChange={e => setData('size', e.target.value)} className="w-full border-4 border-black p-3" />
                            </div>
                            <div className="flex-1 w-full">
                                <label className="block font-bold uppercase mb-2">Stock Amount</label>
                                <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} className="w-full border-4 border-black p-3" />
                            </div>
                            <button disabled={processing} type="submit" className="bg-black text-white px-6 py-3 border-4 border-black font-black uppercase hover:bg-white hover:text-black w-full md:w-auto h-[56px]">
                                Add
                            </button>
                        </form>
                        {(errors.size || errors.stock) && <div className="text-red-600 font-bold mt-4">{errors.size} {errors.stock}</div>}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}