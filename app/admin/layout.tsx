import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin - Print Shop',
  description: 'Shopify-like Admin Dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex h-screen bg-[#f1f1f1] ${inter.className} text-[#303030]`}>
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] text-[#e3e3e3] flex flex-col flex-shrink-0">
        <div className="p-4 flex items-center gap-3 border-b border-[#303030] h-14">
          <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center font-bold text-black">P</div>
          <span className="font-semibold">Print Shop Admin</span>
        </div>
        
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          <NavLink href="/admin" icon={Home} label="Home" />
          <NavLink href="/admin/orders" icon={ShoppingCart} label="Orders" count={2} />
          <NavLink href="/admin/products" icon={Package} label="Products" />
          <NavLink href="/admin/customers" icon={Users} label="Customers" />
          <div className="pt-4 pb-2">
             <div className="h-px bg-[#303030] mx-2 mb-2"></div>
             <p className="px-3 text-xs uppercase text-gray-500 font-semibold mb-1">Store</p>
             <NavLink href="/" icon={LogOut} label="View Online Store" />
          </div>
        </nav>

        <div className="p-2 border-t border-[#303030]">
           <NavLink href="/admin/settings" icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 h-14 flex items-center px-6 sticky top-0 z-10">
          <h1 className="text-sm font-medium text-gray-500">Dashboard</h1>
          <div className="ml-auto">
             {/* Search or User Menu could go here */}
             <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          </div>
        </header>
        <div className="p-6 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, icon: Icon, label, count }: { href: string, icon: any, label: string, count?: number }) {
  // Navigation active state logic would go here (using usePathname)
  // For now simple static style
  return (
    <Link href={href} className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-[#b3b3b3] hover:bg-[#303030] hover:text-white transition-colors group">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-[#8c9196] group-hover:text-white transition-colors" />
        <span>{label}</span>
      </div>
      {count !== undefined && (
        <span className="bg-[#303030] text-gray-300 text-xs px-2 py-0.5 rounded-full group-hover:bg-[#404040]">{count}</span>
      )}
    </Link>
  );
}
