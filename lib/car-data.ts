export const CAR_BRANDS = {
    "Audi": [
        "80", "100", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "e-tron", "Q4 e-tron", "GT"
    ],
    "BMW": [
        "1 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z3", "Z4", "Z8", "i3", "i4", "iX", "M2", "M3", "M4", "M5"
    ],
    "Citroën": [
        "AX", "Saxo", "ZX", "Xsara", "Xsara Picasso", "Xantia", "XM", "C1", "C2", "C3", "C3 Aircross", "C3 Picasso", "C4", "C4 Cactus", "C4 Picasso", "C4 SpaceTourer", "C5", "C5 Aircross", "C6", "C8", "Berlingo", "Nemo", "Jumpy", "DS3", "DS4", "DS5"
    ],
    "Dacia": [
        "Sandero", "Logan", "Duster", "Lodgy", "Dokker", "Jogger", "Spring"
    ],
    "Fiat": [
        "500", "500X", "500L", "Panda", "Punto", "Grande Punto", "Tipo", "Bravo", "Stilo", "Multipla", "Doblo", "Ulysse", "Croma"
    ],
    "Ford": [
        "Ka", "Fiesta", "Focus", "Mondeo", "Puma", "Kuga", "EcoSport", "Mustang", "Explorer", "Ranger", "Transit", "Escort", "Sierra", "Scorpio", "C-MAX", "S-MAX", "Galaxy", "B-MAX"
    ],
    "Honda": [
        "Civic", "Jazz", "Accord", "Prelude", "CR-X", "HR-V", "CR-V", "FR-V", "S2000", "Insight", "e"
    ],
    "Hyundai": [
        "Atos", "Getz", "i10", "i20", "i30", "i40", "ix20", "ix35", "Kona", "Tucson", "Santa Fe", "Veloster", "IONIQ 5"
    ],
    "Kia": [
        "Picanto", "Rio", "Ceed", "ProCeed", "Stonic", "Soul", "Venga", "Carens", "Sportage", "Sorento", "Niro", "EV6"
    ],
    "Mercedes-Benz": [
        "190", "A-Class", "B-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLK", "CLS", "SLK", "SLC", "SL", "CL", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "V-Class", "Vito", "EQA", "EQC", "EQS"
    ],
    "Nissan": [
        "Micra", "Note", "Almera", "Primera", "Juke", "Qashqai", "X-Trail", "Pathfinder", "Patrol", "Navara", "350Z", "370Z", "GT-R", "Leaf", "Ariya"
    ],
    "Opel": [
        "Agila", "Adam", "Karl", "Corsa", "Tigra", "Astra", "Meriva", "Zafira", "Vectra", "Signum", "Omega", "Insignia", "Mokka", "Crossland", "Grandland", "Antara", "Frontera"
    ],
    "Peugeot": [
        "106", "107", "108", "205", "206", "207", "208", "306", "307", "308", "406", "407", "408", "508", "607", "806", "807", "1007", "2008", "3008", "5008", "RCZ", "Partner", "Rifter", "Bipper", "Traveller"
    ],
    "Renault": [
        "Twingo", "Clio", "Megane", "Laguna", "Safrane", "Vel Satis", "Espace", "Avantime", "Modus", "Captur", "Kadjar", "Koleos", "Arkana", "Austral", "Scenic", "Grand Scenic", "Kangoo", "Trafic", "Zoe"
    ],
    "Seat": [
        "Arosa", "Mii", "Ibiza", "Cordoba", "Leon", "Toledo", "Altea", "Exeo", "Arona", "Ateca", "Tarraco", "Alhambra"
    ],
    "Skoda": [
        "Citigo", "Fabia", "Roomster", "Rapid", "Scala", "Octavia", "Superb", "Yeti", "Kamiq", "Karoq", "Kodiaq", "Enyaq"
    ],
    "Tesla": [
        "Roadster", "Model S", "Model 3", "Model X", "Model Y"
    ],
    "Toyota": [
        "Aygo", "IQ", "Yaris", "Verso", "Auris", "Corolla", "Avensis", "Prius", "C-HR", "RAV4", "Highlander", "Land Cruiser", "Hilux", "MR2", "Celica", "Supra"
    ],
    "Volkswagen": [
        "Lupo", "Fox", "Up!", "Polo", "Golf", "Bora", "Jetta", "Vento", "New Beetle", "Beetle", "Scirocco", "Eos", "Passat", "CC", "Arteon", "Phaeton", "T-Roc", "T-Cross", "Tiguan", "Touareg", "Touran", "Sharan", "Caddy", "Transporter", "ID.3", "ID.4", "ID.5", "ID.Buzz"
    ],
    "Volvo": [
        "C30", "S40", "V40", "V50", "S60", "V60", "S70", "V70", "C70", "S80", "XC40", "XC60", "XC70", "XC90"
    ]
} as const;

export type CarBrand = keyof typeof CAR_BRANDS;
