import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductDetail({ product, colors }: { product: any, colors: any[] }) {
    const [selectedSize, setSelectedSize] = useState<any>(null);
    const sortedVariants = product.variants ? [...product.variants].sort((a,b) => {
        const order = { 'S': 1, 'M': 2, 'L': 3, 'XL': 4, 'XXL': 5 };
        return ((order as any)[a.size] || 99) - ((order as any)[b.size] || 99);
    }) : [];

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('PLEASE SELECT A SIZE ALRIGHT');
            return;
        }
        // Simplified Cart Logic for Phase 1
        alert(`ADDED TO CART! \n${product.name} - ${product.color} (${selectedSize.size})`);
    };

    return (
        <StorefrontLayout>
            <Head title={`${product.name} - ${product.color} | Peach Cat Club`} />
            
            <div className="mb-8">
                <Link href="/" className="font-black uppercase text-xl hover:underline underline-offset-8 decoration-4">&larr; BACK TO SHOP</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Images strictly 4:5 */}
                <div className="space-y-6">
                    {product.images && product.images.length > 0 ? (
                        product.images.map((img: any) => (
                            <div key={img.id} className="w-full aspect-[4/5] border-4 border-black bg-gray-100 overflow-hidden">
                                <img src={`/storage/${img.path}`} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                        ))
                    ) : (
                        <div className="w-full aspect-[4/5] border-4 border-black bg-gray-100 flex items-center justify-center">
                            <span className="font-black text-4xl uppercase text-gray-300">NO IMAGE</span>
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col lg:sticky lg:top-28 h-fit">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">{product.name}</h1>
                    <p className="text-3xl font-bold mb-8">Rp {Number(product.price).toLocaleString('id-ID')}</p>
                    
                    {/* Other Colors */}
                    {colors.length > 1 && (
                        <div className="mb-10">
                            <p className="font-black uppercase mb-4 text-xl border-b-4 border-black pb-2">Colors</p>
                            <div className="flex gap-4 flex-wrap">
                                {colors.map(c => (
                                    <Link key={c.id} href={route('product.show', c.slug)} className={`font-bold uppercase px-4 py-2 border-2 ${c.id === product.id ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}>
                                        {c.color}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sizes */}
                    <div className="mb-12">
                        <div className="flex justify-between items-end border-b-4 border-black pb-2 mb-4">
                            <p className="font-black uppercase text-xl">Size</p>
                            <button className="font-bold underline text-gray-500 hover:text-black">SIZE CHART</button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {sortedVariants.map((v: any) => {
                                const outOfStock = v.stock === 0;
                                return (
                                    <button 
                                        key={v.id}
                                        disabled={outOfStock}
                                        onClick={() => setSelectedSize(v)}
                                        className={`relative border-2 font-black text-2xl py-4 uppercase transition-all
                                            ${outOfStock ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 
                                              selectedSize?.id === v.id ? 'border-black bg-black text-white' : 'border-black bg-white text-black hover:bg-gray-100'}`}
                                    >
                                        {v.size}
                                        {outOfStock && <span className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-300 transform -translate-y-1/2 rotate-12"></span>}
                                    </button>
                                );
                            })}
                        </div>
                        {sortedVariants.length === 0 && (
                            <p className="bg-yellow-300 border-2 border-black p-4 font-bold uppercase text-lg">Inventory empty. Admin needs to add variants.</p>
                        )}
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        className="w-full bg-black text-white text-3xl font-black uppercase py-6 border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none mb-12"
                    >
                        ADD TO CART
                    </button>

                    <div className="prose prose-lg max-w-none">
                        <p className="font-medium text-xl leading-relaxed whitespace-pre-wrap">{product.description}</p>
                    </div>
                </div>
            </div>
        </StorefrontLayout>
    );
}