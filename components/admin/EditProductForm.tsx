'use client';

import Link from 'next/link';
import { ArrowLeft, Upload, X, Eye } from 'lucide-react';
import { updateProduct } from '@/app/actions';
import { useState, useRef, useEffect } from 'react';
import { CAR_BRANDS, CarBrand } from '@/lib/car-data';

interface Product {
    id: string;
    title: string;
    description: string | null;
    price: number | string;
    compareAtPrice: number | null;
    stock: number;
    status: string;
    images: string; // JSON string
    brand: string | null;
    model: string | null;
    slug: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
}

export default function EditProductForm({ product }: { product: Product }) {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [slug, setSlug] = useState(product.slug || '');

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initialize previews from existing product images
    useEffect(() => {
        try {
            const existingImages = JSON.parse(product.images);
            if (Array.isArray(existingImages)) {
                setPreviews(existingImages);
            }
        } catch (e) {
            // ignore
        }
    }, [product.images]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setImages(prev => [...prev, ...newFiles]);

            // Create previews for NEW files
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            // Just append visual previews. 
            // Note: "previews" state mixes remote URLs (existing) and blob URLs (new).
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        // Complex logic needed here if we want to remove existing images from DB.
        // For MVP, let's just remove from visual preview. 
        // If it's a blob URL, remove from 'images' state too.
        // This is tricky without metadata. 
        // Simplified: We won't support deleting individual images in this lightweight edit yet, just adding.
        // Or we can just filter the preview and not submit the deleted one? 
        // But server action appends.
        alert("Removing images is not supported in this version yet. You can only add new ones.");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        formData.delete('file-upload');

        images.forEach(image => {
            formData.append('images', image);
        });

        await updateProduct(product.id, formData);
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-md text-gray-500">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Edit product</h1>
                    </div>
                    <Link
                        href={`/products/${slug || product.id}`}
                        target="_blank"
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Eye size={16} />
                        Voir le produit
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input name="title" defaultValue={product.title} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea name="description" defaultValue={product.description || ''} rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"></textarea>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Media</h3>

                            {previews.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-4">
                                    {previews.map((src, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden group">
                                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="bg-gray-100 p-3 rounded-full mb-2">
                                    <Upload size={24} className="text-gray-400" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Add Image</span>
                                <input
                                    type="file"
                                    name="file-upload"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Pricing</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                                        <input name="price" defaultValue={Number(product.price)} type="number" step="0.01" className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" required />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-semibold text-gray-900">Search engine listing</h3>
                                    <span className="text-xs text-blue-600 cursor-pointer hover:underline">Edit</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md mb-4">
                                    <h4 className="text-blue-700 text-lg hover:underline cursor-pointer truncate w-full">{product.metaTitle || product.title}</h4>
                                    <p className="text-green-700 text-sm">https://yourstore.com/products/{slug || product.title.toLowerCase().replace(/ /g, '-')}</p>
                                    <p className="text-gray-600 text-sm line-clamp-2">{product.metaDescription || product.description}</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Page title</label>
                                        <input name="metaTitle" defaultValue={product.metaTitle || ''} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder={product.title} />
                                        <p className="text-xs text-gray-500 mt-1">0 of 70 characters used</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta description</label>
                                        <textarea name="metaDescription" defaultValue={product.metaDescription || ''} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder={product.description?.substring(0, 160) || ''}></textarea>
                                        <p className="text-xs text-gray-500 mt-1">0 of 320 characters used</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">URL handle</label>
                                        <div className="flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">/products/</span>
                                            <input
                                                name="slug"
                                                defaultValue={product.slug || ''}
                                                onChange={(e) => setSlug(e.target.value)}
                                                type="text"
                                                className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Product organization</h3>
                            <BrandModelSelect
                                defaultBrand={product.brand}
                                defaultModel={product.model}
                            />
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Status</h3>
                            <select name="status" defaultValue={product.status} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                                <option value="ACTIVE">Active</option>
                                <option value="DRAFT">Draft</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto mt-6 flex justify-end gap-4">
                    <Link href="/admin/products" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">Discard</Link>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-[#1a1a1a] text-white rounded-md text-sm font-medium hover:bg-[#303030] disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
}

function BrandModelSelect({ defaultBrand, defaultModel }: { defaultBrand: string | null, defaultModel: string | null }) {
    const [selectedBrand, setSelectedBrand] = useState<CarBrand | ''>((defaultBrand as CarBrand) || '');
    // Ensure default model is valid for the brand, otherwise clear it
    const initialModel = (defaultBrand && defaultModel && CAR_BRANDS[defaultBrand as CarBrand]?.includes(defaultModel)) ? defaultModel : '';

    // We don't strictly need state for model if we just want to reset it when brand changes, but controlled input is nicer.
    // However, for a simple form submission without intricate state logic, we can just use key to reset.

    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select
                    name="brand"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value as CarBrand)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                    <option value="">Select a brand</option>
                    {Object.keys(CAR_BRANDS).map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <select
                    name="model"
                    key={selectedBrand} // Reset when brand changes
                    defaultValue={selectedBrand === defaultBrand ? initialModel : ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    disabled={!selectedBrand}
                >
                    <option value="">{selectedBrand ? 'Select a model' : 'Select a brand first'}</option>
                    {selectedBrand && CAR_BRANDS[selectedBrand]?.map(model => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
            </div>
        </>
    );
}
