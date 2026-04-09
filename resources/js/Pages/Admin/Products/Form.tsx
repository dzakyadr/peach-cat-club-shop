import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

export default function Form({ product, categories }: { product?: any, categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: product?.category_id || '',
        name: product?.name || '',
        style_code: product?.style_code || '',
        color: product?.color || '',
        price: product?.price || '',
        weight: product?.weight || 500,
        description: product?.description || '',
        is_published: product ? !!product.is_published : false,
        image: null as File | null,
    });
    
    // Inertia doesn't support PUT with files easily, we use simulated PUT
    const submitUrl = product ? route('admin.products.update', product.id) : route('admin.products.store');
    
    const [preview, setPreview] = useState<string | null>(product?.images?.[0]?.path ? `/storage/${product.images[0].path}` : null);
    const [ratioError, setRatioError] = useState('');
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setRatioError('');
        
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const ratio = img.width / img.height;
                const target = 4 / 5;
                if (Math.abs(ratio - target) > target * 0.05) {
                    setRatioError(`Dimensi gambar harus rasio 4:5 (sekarang: ${img.width}x${img.height}). Harap crop dulu.`);
                    e.target.value = '';
                    setData('image', null);
                    setPreview(product?.images?.[0]?.path ? `/storage/${product.images[0].path}` : null);
                } else {
                    setData('image', file);
                    setPreview(img.src);
                }
            };
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const forceData: any = {
            ...data,
            is_published: data.is_published ? 1 : 0,
        };
        
        if (product) {
            forceData['_method'] = 'PUT';
        }

        router.post(submitUrl, forceData, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title={product ? 'Edit Product' : 'Create Product'} />
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-4">
                {product ? 'Edit Product' : 'New Product'}
            </h1>

            <form onSubmit={submit} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000] grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-xl font-bold uppercase mb-2">Product Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border-4 border-black p-3 font-medium focus:ring-0" />
                        {errors.name && <div className="text-red-600 font-bold mt-1">{errors.name}</div>}
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xl font-bold uppercase mb-2">Style Code</label>
                            <input type="text" value={data.style_code} onChange={e => setData('style_code', e.target.value)} className="w-full border-4 border-black p-3 font-medium focus:ring-0" placeholder="e.g. TEE-001" />
                            {errors.style_code && <div className="text-red-600 font-bold mt-1">{errors.style_code}</div>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-xl font-bold uppercase mb-2">Color</label>
                            <input type="text" value={data.color} onChange={e => setData('color', e.target.value)} className="w-full border-4 border-black p-3 font-medium focus:ring-0" placeholder="e.g. Black" />
                            {errors.color && <div className="text-red-600 font-bold mt-1">{errors.color}</div>}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xl font-bold uppercase mb-2">Price (Rp)</label>
                            <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full border-4 border-black p-3 font-medium focus:ring-0" />
                            {errors.price && <div className="text-red-600 font-bold mt-1">{errors.price}</div>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-xl font-bold uppercase mb-2">Weight (grams)</label>
                            <input type="number" value={data.weight} onChange={e => setData('weight', e.target.value)} className="w-full border-4 border-black p-3 font-medium focus:ring-0" />
                            {errors.weight && <div className="text-red-600 font-bold mt-1">{errors.weight}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xl font-bold uppercase mb-2">Category</label>
                        <select value={data.category_id} onChange={e => setData('category_id', e.target.value)} className="w-full border-4 border-black p-3 font-medium focus:ring-0">
                            <option value="">-- Choose Category --</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        {errors.category_id && <div className="text-red-600 font-bold mt-1">{errors.category_id}</div>}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-xl font-bold uppercase mb-2">Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={4} className="w-full border-4 border-black p-3 font-medium focus:ring-0" />
                    </div>

                    <div>
                        <label className="block text-xl font-bold uppercase mb-2">Status</label>
                        <label className="flex items-center gap-3 border-4 border-black p-3 cursor-pointer select-none">
                            <input type="checkbox" checked={data.is_published} onChange={e => setData('is_published', e.target.checked)} className="w-6 h-6 border-2 border-black text-black focus:ring-0" />
                            <span className="font-bold text-lg uppercase">Publish to Storefront</span>
                        </label>
                    </div>

                    <div className="border-4 border-black p-4 bg-gray-50">
                        <label className="block text-xl font-bold uppercase mb-2">Cover Image (Rasio 4:5)</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full mb-4" />
                        {ratioError && <div className="bg-red-200 border-2 border-red-600 p-2 text-red-800 font-bold mb-4">{ratioError}</div>}
                        {errors.image && <div className="text-red-600 font-bold mb-4">{errors.image}</div>}
                        
                        {preview && (
                            <div className="relative w-48 aspect-[4/5] border-4 border-black overflow-hidden mx-auto bg-gray-200">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="col-span-1 md:col-span-2 pt-6">
                    <button disabled={processing} type="submit" className="bg-black text-white px-8 py-4 text-2xl font-black uppercase hover:bg-white hover:text-black border-4 border-black transition-colors w-full">
                        {product ? 'Update Details' : 'Create Product'}
                    </button>
                    {product && <div className="mt-4 text-center text-lg font-bold">To handle Size Variants, go to the Product's Index and click "Variants".</div>}
                </div>
            </form>
        </AdminLayout>
    );
}