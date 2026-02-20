export interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  images: string[]
  description: string
  specs: { label: string; value: string }[]
  stock: number
  rating: number
  reviewCount: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    price: 1479.00,
    category: "smartphones",
    image: "/iphone.jpg",
    images: ["/iphone.jpg", "/iphone2.jpg", "/iphone3.jpg", "/iphone.jpg"],
    description:
      "Le smartphone le plus avancé d'Apple. Puce A18 Pro, écran Super Retina XDR 6.9 pouces, système photo 48MP avec zoom optique 5x.",
    specs: [
      { label: "Puce", value: "A18 Pro" },
      { label: "Écran", value: "6.9\" Super Retina XDR" },
      { label: "Caméra", value: "48MP + 48MP + 12MP" },
      { label: "Stockage", value: "256 Go" },
      { label: "Batterie", value: "Jusqu'à 33h vidéo" },
      { label: "Poids", value: "227g" },
      { label: "Résistance", value: "IP68" },
      { label: "Garantie", value: "2 ans Apple" },
    ],
    stock: 15,
    rating: 5,
    reviewCount: 342,
  },
  {
    id: 2,
    name: "MacBook Pro M4 14\"",
    price: 2399.00,
    category: "ordinateurs",
    image: "/macbook.jpg",
    images: ["/macbook.jpg", "/macbook2.jpg", "/macbook3.jpg", "/macbook.jpg"],
    description:
      "Puissance professionnelle avec la puce M4 Pro. Écran Liquid Retina XDR, jusqu'à 24h d'autonomie, 24 Go de mémoire unifiée.",
    specs: [
      { label: "Puce", value: "Apple M4 Pro" },
      { label: "Mémoire", value: "24 Go unifiée" },
      { label: "Stockage", value: "512 Go SSD" },
      { label: "Écran", value: "14.2\" Liquid Retina XDR" },
      { label: "Autonomie", value: "Jusqu'à 24h" },
      { label: "Poids", value: "1.55 kg" },
      { label: "Ports", value: "3x Thunderbolt 4, HDMI, SD" },
      { label: "Garantie", value: "2 ans Apple" },
    ],
    stock: 8,
    rating: 5,
    reviewCount: 187,
  },
  {
    id: 3,
    name: "AirPods Pro 3",
    price: 279.00,
    category: "audio",
    image: "/airpods.jpg",
    images: ["/airpods.jpg", "/applewatch.jpg", "/iphone2.jpg", "/airpods.jpg"],
    description:
      "Réduction active du bruit de nouvelle génération, audio spatial personnalisé, boîtier USB-C avec haut-parleur intégré.",
    specs: [
      { label: "Puce", value: "H3" },
      { label: "Réduction bruit", value: "2x plus efficace" },
      { label: "Audio spatial", value: "Personnalisé" },
      { label: "Autonomie", value: "6h (30h avec boîtier)" },
      { label: "Résistance", value: "IP54" },
      { label: "Connectique", value: "USB-C / MagSafe" },
      { label: "Compatibilité", value: "iOS, iPadOS, macOS" },
      { label: "Garantie", value: "2 ans Apple" },
    ],
    stock: 25,
    rating: 5,
    reviewCount: 523,
  },
  {
    id: 4,
    name: "iPad Pro M4 12.9\"",
    price: 1599.00,
    category: "tablettes",
    image: "/ipad.jpg",
    images: ["/ipad.jpg", "/ipad2.jpg", "/macbook3.jpg", "/ipad.jpg"],
    description:
      "L'iPad le plus fin et le plus puissant. Écran Ultra Retina XDR tandem OLED, puce M4, compatible Apple Pencil Pro.",
    specs: [
      { label: "Puce", value: "Apple M4" },
      { label: "Écran", value: "13\" Ultra Retina XDR OLED" },
      { label: "Stockage", value: "256 Go" },
      { label: "Mémoire", value: "16 Go" },
      { label: "Caméra", value: "12MP Ultra Grand-angle" },
      { label: "Poids", value: "579g" },
      { label: "Connectique", value: "USB-C / Thunderbolt" },
      { label: "Garantie", value: "2 ans Apple" },
    ],
    stock: 10,
    rating: 5,
    reviewCount: 156,
  },
  {
    id: 5,
    name: "Dyson V15 Detect",
    price: 699.00,
    category: "électroménager",
    image: "/dyson.jpg",
    images: ["/dyson.jpg", "/lgtv2.jpg", "/dyson.jpg", "/lgtv.jpg"],
    description:
      "Aspirateur sans fil le plus intelligent. Laser révélant la poussière microscopique, écran LCD affichant les particules en temps réel.",
    specs: [
      { label: "Puissance", value: "240 AW" },
      { label: "Autonomie", value: "Jusqu'à 60 min" },
      { label: "Filtration", value: "HEPA intégrale" },
      { label: "Capacité", value: "0.76 L" },
      { label: "Poids", value: "3.1 kg" },
      { label: "Laser", value: "Détection poussière" },
      { label: "Écran", value: "LCD piézo" },
      { label: "Garantie", value: "2 ans Dyson" },
    ],
    stock: 12,
    rating: 4,
    reviewCount: 89,
  },
  {
    id: 6,
    name: "Apple Watch Ultra 3",
    price: 899.00,
    category: "montres",
    image: "/applewatch.jpg",
    images: ["/applewatch.jpg", "/applewatch2.jpg", "/iphone3.jpg", "/applewatch.jpg"],
    description:
      "La montre la plus robuste et performante d'Apple. Boîtier titane, GPS double fréquence, autonomie de 36 heures, capteur santé avancé.",
    specs: [
      { label: "Boîtier", value: "49mm Titane" },
      { label: "Écran", value: "OLED Always-On 2000 nits" },
      { label: "Puce", value: "S10" },
      { label: "Autonomie", value: "36h (72h éco)" },
      { label: "Résistance", value: "100m étanche, MIL-STD" },
      { label: "Capteurs", value: "SpO2, ECG, température" },
      { label: "Connectivité", value: "GPS L1+L5, 4G" },
      { label: "Garantie", value: "2 ans Apple" },
    ],
    stock: 7,
    rating: 5,
    reviewCount: 201,
  },
  {
    id: 7,
    name: "Samsung Galaxy S25 Ultra",
    price: 1459.00,
    category: "smartphones",
    image: "/samsung.jpg",
    images: ["/samsung.jpg", "/samsung2.jpg", "/iphone2.jpg", "/samsung.jpg"],
    description:
      "Smartphone premium avec Galaxy AI intégrée. Écran Dynamic AMOLED 6.8\", caméra 200MP, S Pen intégré, cadre en titane.",
    specs: [
      { label: "Processeur", value: "Snapdragon 8 Elite" },
      { label: "Écran", value: "6.8\" Dynamic AMOLED 2X" },
      { label: "Caméra", value: "200MP + 50MP + 10MP + 50MP" },
      { label: "Stockage", value: "256 Go" },
      { label: "RAM", value: "12 Go" },
      { label: "Batterie", value: "5000 mAh" },
      { label: "Résistance", value: "IP68, Armor Aluminum" },
      { label: "Garantie", value: "2 ans Samsung" },
    ],
    stock: 11,
    rating: 4,
    reviewCount: 178,
  },
  {
    id: 8,
    name: "LG OLED C4 65\"",
    price: 1899.00,
    category: "électroménager",
    image: "/lgtv.jpg",
    images: ["/lgtv.jpg", "/lgtv2.jpg", "/macbook2.jpg", "/lgtv.jpg"],
    description:
      "Téléviseur OLED evo 4K avec processeur α9 AI Gen7. Noir parfait, 144Hz gaming, Dolby Vision & Atmos, webOS 24.",
    specs: [
      { label: "Taille", value: "65 pouces (164 cm)" },
      { label: "Résolution", value: "4K OLED evo" },
      { label: "Processeur", value: "α9 AI Gen7" },
      { label: "Taux rafraîch.", value: "144 Hz" },
      { label: "HDR", value: "Dolby Vision, HDR10, HLG" },
      { label: "Audio", value: "Dolby Atmos 40W" },
      { label: "Gaming", value: "4x HDMI 2.1, VRR, ALLM" },
      { label: "Garantie", value: "2 ans LG" },
    ],
    stock: 4,
    rating: 5,
    reviewCount: 94,
  },
]
