import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Home({ products }: { products: any[] }) {
    return (
        <StorefrontLayout>
            <Head title="Shop | Peach Cat Club" />
            
            <section className="mb-24">
                <h1 className="text-6xl md:text-[8rem] leading-none font-black uppercase tracking-tighter mb-6 text-center md:text-left">
                    LATEST DROP
                </h1>
                <div className="w-full h-4 bg-black mb-12"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
                    {products.map((product, index) => (
                        <motion.div 
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={route('product.show', product.slug)} className="block relative bg-gray-100 aspect-[4/5] border-4 border-black mb-6 overflow-hidden">
                                {product.images && product.images[0] ? (
                                    <img 
                                        src={`/storage/${product.images[0].path}`} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-black uppercase text-4xl text-gray-300">No Image</div>
                                )}
                                
                                {/* Brutalist Add to Cart Overlay */}
                                <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-3xl font-black uppercase border-4 border-white p-4">View Details</span>
                                </div>
                            </Link>
                            
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight">{product.name}</h3>
                                    <p className="text-lg font-bold text-gray-600">{product.color}</p>
                                </div>
                                <span className="text-xl font-black">Rp {Number(product.price).toLocaleString('id-ID')}</span>
                            </div>
                        </motion.div>
                    ))}
                    
                    {products.length === 0 && (
                        <div className="col-span-full py-32 text-center border-4 border-black">
                            <h2 className="text-4xl font-black uppercase">Sold Out.</h2>
                            <p className="text-xl mt-4 font-bold">Wait for the next drop.</p>
                        </div>
                    )}
                </div>
            </section>
        </StorefrontLayout>
    );
}