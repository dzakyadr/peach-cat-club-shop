import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Form({ category }: { category?: any }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (category) {
            put(route('admin.categories.update', category.id));
        } else {
            post(route('admin.categories.store'));
        }
    };

    return (
        <AdminLayout>
            <Head title={category ? 'Edit Category' : 'Create Category'} />
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-4">
                {category ? 'Edit Category' : 'New Category'}
            </h1>

            <form onSubmit={submit} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000] max-w-2xl">
                <div className="mb-6">
                    <label className="block text-xl font-bold uppercase mb-2">Category Name</label>
                    <input 
                        type="text" 
                        value={data.name} 
                        onChange={e => setData('name', e.target.value)} 
                        className="w-full border-4 border-black p-4 text-lg font-medium focus:outline-none focus:ring-0"
                        placeholder="e.g. T-Shirts"
                    />
                    {errors.name && <div className="text-red-600 font-bold mt-2 uppercase">{errors.name}</div>}
                </div>
                
                <button disabled={processing} type="submit" className="bg-black text-white px-8 py-4 text-xl font-black uppercase hover:bg-white hover:text-black border-4 border-black transition-colors w-full">
                    {category ? 'Update Category' : 'Save Category'}
                </button>
            </form>
        </AdminLayout>
    );
}