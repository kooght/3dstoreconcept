import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    title: "Cache borne batterie positive - BMW E46/E39",
    description: "Cache de protection pour borne batterie positive, compatible BMW E46 et E39.",
    price: 0,
    status: "ACTIVE",
    brand: "BMW",
    model: "E46/E39",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop",
    ]),
    slug: "cache-borne-batterie-positive-bmw-e46-e39",
  },
  {
    title: "Support capteur ABS - Peugeot 208",
    description: "Support de fixation capteur ABS imprimé en 3D.",
    price: 12.5,
    status: "ACTIVE",
    brand: "Peugeot",
    model: "208",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop",
    ]),
    slug: "support-capteur-abs-peugeot-208",
  },
  {
    title: "Cache vis aile - Renault Clio 4",
    description: "Cache vis d'aile avant, reproduction fidèle.",
    price: 4.9,
    status: "DRAFT",
    brand: "Renault",
    model: "Clio 4",
    images: JSON.stringify([]),
    slug: "cache-vis-aile-renault-clio-4",
  },
  {
    title: "Clip garniture porte - Audi A3 8P",
    description: "Clip de maintien garniture intérieure.",
    price: 2.5,
    status: "ACTIVE",
    brand: "Audi",
    model: "A3 8P",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop",
    ]),
    slug: "clip-garniture-porte-audi-a3-8p",
  },
  {
    title: "Bouchon lave-glace - Citroën C3",
    description: "Bouchon réservoir lave-glace.",
    price: 6,
    status: "ARCHIVED",
    brand: "Citroën",
    model: "C3",
    images: JSON.stringify([]),
    slug: "bouchon-lave-glace-citroen-c3",
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
