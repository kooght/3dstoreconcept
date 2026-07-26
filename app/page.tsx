import Link from 'next/link';
import VehicleSelector from '@/components/VehicleSelector';
import { prisma } from '@/lib/prisma';
import { ShoppingCart, Star } from 'lucide-react';

export default async function Home() {
  // Get 3 newest products sorted by date descending from DB
  const featuredProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
    where: { status: 'ACTIVE' }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation (Simple placeholder for now) */}
      <nav className="border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src="/logo.png" alt="3D AutoParts" className="h-12 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-gray-600">ACCUEIL</Link>
            <Link href="/catalogue" className="hover:text-gray-600">CATALOGUE</Link>
            <Link href="/contact" className="hover:text-gray-600">CONTACT</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-xs text-gray-500 hover:text-black">ADMIN</Link>
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">0</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gray-900 text-white relative h-[500px] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Abstract pattern or image placeholder */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2694&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>

        <div className="relative z-10 px-4 max-w-4xl mx-auto mt-[-50px]">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">PIÈCES AUTO IMPRIMÉES EN 3D</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Trouvez des pièces de rechange rares, des accessoires personnalisés et des fixations introuvables pour votre voiture.
          </p>
        </div>
      </div>

      {/* Vehicle Selector Container (Negative margin to overlap hero) */}
      <div className="container mx-auto px-4 relative z-20 mb-16">
        <VehicleSelector />
      </div>

      {/* Popular Brands */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-widest">Marques Populaires</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {['Citroën', 'BMW', 'Peugeot', 'Audi', 'Renault', 'Mercedes'].map((brand) => (
            <Link href={`/catalogue?make=${brand}`} key={brand} className="group flex flex-col items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-20 h-20 bg-white border border-gray-100 rounded-full shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow group-hover:border-black">
                {/* Fallback to text first letter if no logo */}
                <span className="text-2xl font-bold text-gray-300 group-hover:text-black">{brand[0]}</span>
              </div>
              <span className="font-medium text-sm text-gray-600 group-hover:text-black">{brand}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">NOUVEAUTÉS</h2>
          <div className="h-1 w-20 bg-black mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group cursor-pointer block">
              <div className="bg-gray-100 rounded-lg overflow-hidden relative aspect-square mb-4">
                {/* Image Rendering */}
                {(() => {
                  let imageUrl = null;
                  try {
                    const images = JSON.parse(product.images);
                    if (Array.isArray(images) && images.length > 0) {
                      imageUrl = images[0];
                    }
                  } catch (e) { }

                  if (imageUrl) {
                    return <img src={imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />;
                  } else {
                    return (
                      <div className="flex items-center justify-center h-full text-gray-400 bg-gray-200 group-hover:bg-gray-300 transition-colors">
                        <span className="text-sm">No Image</span>
                      </div>
                    );
                  }
                })()}
                {/* Badge */}
                {/* <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                  {product.category}
                </div> */}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-gray-600 transition-colors">{product.title}</h3>
                {/* <p className="text-gray-500 text-sm mb-2 line-clamp-1">Compatible: {product.compatibility.join(', ')}</p> */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-black text-black" />
                    <Star size={14} className="fill-black text-black" />
                    <Star size={14} className="fill-black text-black" />
                    <Star size={14} className="fill-black text-black" />
                    <Star size={14} className="fill-black text-black" />
                    <span className="text-xs text-gray-400 ml-1">(12)</span>
                  </div>
                  <span className="font-bold text-xl">{Number(product.price).toFixed(2)} €</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/catalogue" className="inline-block border-2 border-black text-black font-bold py-3 px-8 rounded hover:bg-black hover:text-white transition-colors uppercase">
            Voir tout le catalogue
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-1 mb-4">
              <img src="/logo.png" alt="3D AutoParts" className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 text-sm">
              Votre spécialiste de l'impression 3D pour l'automobile. Pièces sur mesure et reproductions de qualité.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
              <li><Link href="/catalogue" className="hover:text-white">Catalogue</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Légal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white">Mentions légales</Link></li>
              <li><Link href="#" className="hover:text-white">CGV</Link></li>
              <li><Link href="#" className="hover:text-white">Politique de confidentialité</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Newsletter</h4>
            <div className="flex">
              <input type="email" placeholder="Votre email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-gray-500" />
              <button className="bg-white text-black px-4 py-2 rounded-r-md font-bold hover:bg-gray-200">OK</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2026 3DAutoParts. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
