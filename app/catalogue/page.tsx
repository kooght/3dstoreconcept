'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/lib/mock-data';
import { Star, Filter, X } from 'lucide-react';

export default function CataloguePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white p-8 text-sm text-gray-500">Chargement du catalogue…</div>}>
            <CatalogueContent />
        </Suspense>
    );
}

function CatalogueContent() {
    const searchParams = useSearchParams();
    const make = searchParams.get('make');
    const model = searchParams.get('model');

    // Filter products based on compatibility
    const filteredProducts = products.filter(product => {
        // If no filter, show all
        if (!make && !model) return true;

        // Check compatibility
        return product.compatibility.some(compat => {
            if (compat === 'Universal') return true;

            const [compatMake, ...compatModelParts] = compat.split(' ');
            const compatModel = compatModelParts.join(' ');

            if (make && model) {
                // Should match both
                return compat === `${make} ${model}`;
            } else if (make) {
                // Should match make
                return compatMake === make;
            }
            return false;
        });
    });

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Navigation */}
            <nav className="border-b border-gray-100 py-4">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-1">
                        <img src="/logo.png" alt="3D AutoParts" className="h-10 w-auto" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-medium hover:text-gray-600">ACCUEIL</Link>
                    </div>
                </div>
            </nav>

            {/* Header & Filters */}
            <div className="bg-gray-50 py-12 border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-4">CATALOGUE</h1>

                    {/* Active Filters Display */}
                    {(make || model) && (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 font-medium">Véhicule sélectionné :</span>
                            <div className="bg-white border border-gray-300 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-bold shadow-sm">
                                {make} {model}
                                <Link href="/catalogue" className="text-gray-400 hover:text-red-500">
                                    <X size={16} />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">

                {/* Sidebar (Filters) */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white p-6 border border-gray-200 rounded-lg sticky top-8">
                        <div className="flex items-center gap-2 font-bold mb-6 pb-2 border-b border-gray-100">
                            <Filter size={18} />
                            FILTRES
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold mb-3 uppercase">Catégorie</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Intérieur</label></li>
                                    <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Extérieur</label></li>
                                    <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Rangement</label></li>
                                    <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Réparation</label></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold mb-3 uppercase">Matériau</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> ABS Carbone</label></li>
                                    <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> ASA (UV Resistant)</label></li>
                                    <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> PETG</label></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <p className="mb-6 text-sm text-gray-500">{filteredProducts.length} résultat(s) trouvé(s)</p>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Link href={`/products/${product.id}`} key={product.id} className="group block h-full">
                                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                                        <div className="aspect-square bg-gray-100 relative flex items-center justify-center text-gray-400">
                                            <span className="text-xs">Image: {product.title}</span>
                                            {(make || model) && product.compatibility.includes('Universal') && (
                                                <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                                                    Universel
                                                </div>
                                            )}
                                            {(make || model) && !product.compatibility.includes('Universal') && (
                                                <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                                                    Compatible
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                                            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-gray-600 line-clamp-2">{product.title}</h3>

                                            <div className="mt-auto pt-4 flex items-end justify-between">
                                                <div className="font-bold text-lg">{product.price.toFixed(2)} €</div>
                                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Star size={12} className="fill-gray-400" /> 4.8
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-12 text-center border-2 border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg mb-2">Aucune pièce trouvée pour ce véhicule.</p>
                            <p className="text-gray-400 text-sm">Essayez de modifier vos filtres ou contactez-nous pour une demande sur mesure.</p>
                            <button className="mt-6 px-6 py-2 bg-black text-white rounded-md font-medium text-sm hover:bg-gray-800">
                                Demander une pièce sur mesure
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
