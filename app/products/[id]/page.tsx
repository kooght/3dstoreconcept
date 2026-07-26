import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, ShoppingCart, Truck, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
    const products = await prisma.product.findMany({ select: { id: true, slug: true } });
    const params = products.flatMap((p) => {
        const entries = [{ id: p.id }];
        if (p.slug) entries.push({ id: p.slug });
        return entries;
    });
    return params.length > 0 ? params : [{ id: "_" }];
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    let product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product) {
        product = await prisma.product.findUnique({
            where: { slug: params.id },
        });
    }

    if (!product) {
        notFound();
    }

    // Parse images
    let images: string[] = [];
    try {
        images = JSON.parse(product.images);
    } catch (e) {
        images = ['/placeholder-product.jpg'];
    }
    if (images.length === 0) images = ['/placeholder-product.jpg'];
    const mainImage = images[0];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-gray-100 py-4">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-1">
                        <img src="/logo.png" alt="3D AutoParts" className="h-10 w-auto" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-medium hover:text-gray-600">ACCUEIL</Link>
                        <Link href="/catalogue" className="text-sm font-medium hover:text-gray-600">CATALOGUE</Link>
                        <Link href="/admin" className="text-xs text-gray-400">ADMIN</Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <Link href="/catalogue" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8">
                    <ArrowLeft size={16} /> Retour au catalogue
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="bg-gray-100 rounded-lg aspect-square overflow-hidden border border-gray-200">
                            <img src={mainImage} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, i) => (
                                <div key={i} className={`bg-gray-50 rounded-md aspect-square overflow-hidden border cursor-pointer hover:border-black ${i === 0 ? 'border-black' : 'border-gray-200'}`}>
                                    <img src={img} alt={`${product.title} ${i}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-2 text-sm text-gray-500 font-bold uppercase tracking-wider">Pièce Auto</div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold">{Number(product.price).toFixed(2)} €</span>
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">DISPONIBLE À L'IMPRESSION</span>
                        </div>

                        <div className="prose text-gray-600 mb-8 whitespace-pre-wrap">
                            <p>{product.description || "Aucune description disponible."}</p>
                        </div>

                        {/* Compatibility Box (Hardcoded for now as DB doesn't have it yet) */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
                            <h3 className="text-blue-900 font-bold flex items-center gap-2 mb-2">
                                <Check size={18} /> Compatibilité
                            </h3>
                            <p className="text-sm text-blue-800">
                                Veuillez vérifier la compatibilité avec votre véhicule dans la description ci-dessus.
                            </p>
                        </div>

                        <div className="border-t border-b border-gray-100 py-6 mb-8 space-y-4">
                            <div className="flex items-center gap-4">
                                {/* Simple Add to Cart Button (No quantity selector for MVP) */}
                                <form className="flex-1">
                                    <button type="button" className="w-full bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                        <ShoppingCart size={20} />
                                        AJOUTER AU PANIER
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm text-gray-500">
                            <div className="flex items-center gap-3">
                                <Truck size={20} />
                                <span>Livraison suivie sous 48-72h</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={20} />
                                <span>Garantie 2 ans contre les défauts de fabrication</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
