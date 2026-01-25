export const vehicles = [
    { make: "Renault", models: ["Clio 4", "Clio 5", "Megane 4", "Twingo 3"] },
    { make: "Peugeot", models: ["208 I", "208 II", "308 II", "3008 II"] },
    { make: "Citroën", models: ["C3 III", "C4 Cactus", "Berlingo"] },
    { make: "Volkswagen", models: ["Golf 7", "Golf 8", "Polo VI"] },
    { make: "Dacia", models: ["Sandero 2", "Sandero 3", "Duster 2"] },
    { make: "BMW", models: ["Série 1", "Série 3", "X1"] },
    { make: "Audi", models: ["A1", "A3", "Q3"] },
    { make: "Mercedes", models: ["Classe A", "Classe C", "GLA"] },
];

export const mockPlates: Record<string, { make: string, model: string }> = {
    "AA123BB": { make: "Renault", model: "Clio 5" },
    "CC888DD": { make: "Peugeot", model: "208 II" },
    "EF456GH": { make: "Volkswagen", model: "Golf 7" },
    "XX000XX": { make: "Dacia", model: "Duster 2" },
};

export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    compatibility: string[]; // "Universal" or specific "Make Model"
    createdAt: string; // ISO Date
}

export const products: Product[] = [
    {
        id: "1",
        title: "Support Téléphone Tableau de Bord",
        price: 19.99,
        image: "/placeholder-phone-holder.jpg",
        category: "Accessoires",
        compatibility: ["Renault Clio 4", "Renault Clio 5", "Peugeot 208 II"],
        createdAt: "2025-12-01T10:00:00Z"
    },
    {
        id: "2",
        title: "Cache Moyeu Personnalisé (Set de 4)",
        price: 24.99,
        image: "/placeholder-hubcap.jpg",
        category: "Extérieur",
        compatibility: ["Universal"],
        createdAt: "2025-12-05T14:30:00Z"
    },
    {
        id: "3",
        title: "Clip Pare-soleil Renforcé",
        price: 9.99,
        image: "/placeholder-visor-clip.jpg",
        category: "Réparation",
        compatibility: ["Peugeot 208 I", "Peugeot 308 II", "Citroën C3 III"],
        createdAt: "2026-01-10T09:15:00Z"
    },
    {
        id: "4",
        title: "Organisateur Console Centrale",
        price: 14.99,
        image: "/placeholder-organizer.jpg",
        category: "Rangement",
        compatibility: ["Volkswagen Golf 7", "Volkswagen Golf 8"],
        createdAt: "2026-01-15T11:20:00Z"
    },
    {
        id: "5",
        title: "Support Gobelet Portière",
        price: 12.50,
        image: "/placeholder-cupholder.jpg",
        category: "Rangement",
        compatibility: ["Dacia Sandero 3", "Dacia Duster 2"],
        createdAt: "2026-01-20T16:45:00Z"
    },
    {
        id: "6",
        title: "Levier de Vitesse Custom",
        price: 29.99,
        image: "/placeholder-gear-knob.jpg",
        category: "Intérieur",
        compatibility: ["Universal"],
        createdAt: "2026-01-01T10:00:00Z"
    },
    {
        id: "7",
        title: "Support Tablette Appui-Tête",
        price: 34.99,
        image: "/placeholder-tablet.jpg",
        category: "Accessoires",
        compatibility: ["Universal"],
        createdAt: "2026-01-25T08:00:00Z" // Newest item
    }
];
