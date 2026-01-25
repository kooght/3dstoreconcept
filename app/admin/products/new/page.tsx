'use client';

import Link from 'next/link';
import { ArrowLeft, Upload, X, ImageIcon } from 'lucide-react';
import { createProduct } from '@/app/actions';
import { useState, useRef } from 'react';

export default function CreateProductPage() {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // SEO State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [manualSeo, setManualSeo] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setImages(prev => [...prev, ...newFiles]);

            // Create previews
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTitle(val);

        if (!manualSeo) {
            setMetaTitle(val);
            const generatedSlug = val.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setSlug(generatedSlug);
        }
    };

    const handleSeoChange = (type: 'title' | 'slug', val: string) => {
        setManualSeo(true);
        if (type === 'title') setMetaTitle(val);
        if (type === 'slug') setSlug(val);
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => {
            // Revoke URL to avoid memory leaks
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        // Remove the original empty file input if it exists (though we normally ignore it in logic, explicit is better)
        formData.delete('file-upload');

        // Append actual state files
        images.forEach(image => {
            formData.append('images', image);
        });

        // Call server action
        await createProduct(formData);
        // Redirect is handled in server action, so we don't need to do anything here usually.
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-md text-gray-500">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Add product</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="Short sleeve t-shirt"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea name="description" rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="Description"></textarea>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Media</h3>

                            {/* Image Grid */}
                            {previews.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-4">
                                    {previews.map((src, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden group">
                                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Upload Button */}
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="bg-gray-100 p-3 rounded-full mb-2">
                                    <Upload size={24} className="text-gray-400" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Add Image</span>
                                <span className="text-xs text-gray-400 mt-1">Accepts images (PNG, JPG)</span>
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
                                        <input name="price" type="number" step="0.01" className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="0.00" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Compare-at price</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                                        <input name="compareAtPrice" type="number" step="0.01" className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-gray-900">Search engine listing</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Page title</label>
                                    <input
                                        name="metaTitle"
                                        type="text"
                                        value={metaTitle}
                                        onChange={(e) => handleSeoChange('title', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        placeholder=""
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{metaTitle.length} of 70 characters used</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta description</label>
                                    <textarea name="metaDescription" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder=""></textarea>
                                    <p className="text-xs text-gray-500 mt-1">0 of 320 characters used</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL handle</label>
                                    <div className="flex rounded-md shadow-sm">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">/products/</span>
                                        <input
                                            name="slug"
                                            type="text"
                                            value={slug}
                                            onChange={(e) => handleSeoChange('slug', e.target.value)}
                                            className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Status</h3>
                            <select name="status" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                                <option value="ACTIVE">Active</option>
                                <option value="DRAFT">Draft</option>
                            </select>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Product Organization</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                <input name="brand" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="e.g. Toyota" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                                <input name="model" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="e.g. Corolla 2020" />
                            </div>
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
