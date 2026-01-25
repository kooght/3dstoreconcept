import Link from 'next/link';
import { ArrowRight, DollarSign, Package, ShoppingBag, Users } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Sales" value="€1,234.56" icon={DollarSign} trend="+12%" />
                <StatCard title="Total Orders" value="23" icon={ShoppingBag} trend="+4" />
                <StatCard title="Active Products" value="45" icon={Package} />
                <StatCard title="Customers" value="12" icon={Users} trend="+2" />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                    <Link href="/admin/orders" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                            <tr>
                                <th className="px-6 py-3">Order</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[1024, 1023, 1022, 1021, 1020].map((order) => (
                                <tr key={order} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">#{order}</td>
                                    <td className="px-6 py-4">Jan 25, 2026</td>
                                    <td className="px-6 py-4">John Doe</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Pending</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">€45.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend?: string }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                {trend && <p className="text-green-600 text-xs font-medium mt-1">{trend} from last month</p>}
            </div>
            <div className="p-3 bg-gray-50 rounded-full text-gray-500">
                <Icon size={24} />
            </div>
        </div>
    );
}
