import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-black font-sans flex flex-col selection:bg-black selection:text-white">
            <header className="border-b-4 border-black bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="text-3xl lg:text-4xl font-black uppercase tracking-tighter hover:text-gray-600 transition-colors">
                        PEACH CAT CLUB
                    </Link>
                    <nav className="flex gap-8 items-center font-bold uppercase tracking-wide text-lg">
                        <Link href="/" className="hover:underline underline-offset-8 decoration-4">Shop</Link>
                        <button className="flex items-center gap-2 hover:underline underline-offset-8 decoration-4">
                            Cart [0]
                        </button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>

            <footer className="border-t-4 border-black bg-black text-white mt-auto">
                <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-start gap-12">
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">P.C.C.</h2>
                        <p className="font-medium text-lg text-gray-300 max-w-xs">Streetwear born from internet culture. Bold, uncompromising, strictly limited.</p>
                    </div>
                    <div className="flex flex-col gap-2 font-bold uppercase text-xl">
                        <Link href="/" className="hover:text-gray-400">Instagram</Link>
                        <Link href="/" className="hover:text-gray-400">Twitter</Link>
                        <Link href="/" className="hover:text-gray-400">TikTok</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}