import Link from 'next/link';
import { Plus, Search, Filter, MoreHorizontal, ImageIcon } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <Link href="/admin/products/new" className="bg-[#1a1a1a] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#303030] flex items-center gap-2">
                    <Plus size={18} />
                    Add Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Filter products"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Filter size={16} />
                            Status
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Filter size={16} />
                            Vendor
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 w-12">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </th>
                                <th className="px-6 py-3 w-20">Image</th>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Vendor</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No products found. Click "Add Product" to create one.
                                    </td>
                                </tr>
                            ) : products.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 group">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden relative">
                                            {(() => {
                                                try {
                                                    const images = JSON.parse(item.images);
                                                    if (Array.isArray(images) && images.length > 0) {
                                                        return <img src={images[0]} alt={item.title} className="w-full h-full object-cover" />;
                                                    }
                                                } catch (e) { }
                                                return <ImageIcon size={20} />;
                                            })()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <Link href={`/admin/products/${item.id}`} className="hover:underline">{item.title}</Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">PrintShop</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
