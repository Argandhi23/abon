import { Product } from "../types";

export const products: Product[] = [
  {
    id: "abon-sapi-original",
    name: "Abon Sapi Original",
    slug: "abon-sapi-original",
    description: "Abon sapi asli dengan bumbu rempah tradisional nusantara. Dibuat dari daging sapi pilihan tanpa bahan pengawet, memberikan cita rasa manis gurih yang khas dan lezat.",
    price: 35000,
    weight: "100g",
    images: [
      "https://picsum.photos/seed/abon-sapi-original-1/600/400",
      "https://picsum.photos/seed/abon-sapi-original-2/600/400"
    ],
    category: "Abon Sapi",
    spiceLevel: 0,
    stock: 150,
    rating: 4.9,
    reviewCount: 320,
    badge: "Best Seller",
    variants: [
      { weight: "100g", price: 35000 },
      { weight: "250g", price: 85000 },
      { weight: "500g", price: 165000 },
    ]
  },
  {
    id: "abon-sapi-pedas",
    name: "Abon Sapi Pedas",
    slug: "abon-sapi-pedas",
    description: "Bagi pecinta pedas! Abon sapi pilihan berpadu dengan irisan cabai merah asli yang memberikan sensasi pedas nendang namun tetap mempertahankan gurihnya daging sapi.",
    price: 38000,
    weight: "100g",
    images: [
      "https://picsum.photos/seed/abon-sapi-pedas-1/600/400",
      "https://picsum.photos/seed/abon-sapi-pedas-2/600/400"
    ],
    category: "Abon Sapi",
    spiceLevel: 4,
    stock: 95,
    rating: 4.8,
    reviewCount: 184,
    badge: "Hot",
    variants: [
      { weight: "100g", price: 38000 },
      { weight: "250g", price: 92000 }
    ]
  },
  {
    id: "abon-ayam-original",
    name: "Abon Ayam Original",
    slug: "abon-ayam-original",
    description: "Abon ayam lembut dengan tekstur yang pas. Terbuat dari dada ayam fillet dan bumbu rempah pilihan, cocok untuk lauk anak-anak maupun orang dewasa.",
    price: 30000,
    weight: "100g",
    images: [
      "https://picsum.photos/seed/abon-ayam-original-1/600/400",
      "https://picsum.photos/seed/abon-ayam-original-2/600/400"
    ],
    category: "Abon Ayam",
    spiceLevel: 0,
    stock: 120,
    rating: 4.7,
    reviewCount: 156,
    variants: [
      { weight: "100g", price: 30000 },
      { weight: "250g", price: 72000 }
    ]
  },
  {
    id: "abon-ikan-tuna",
    name: "Abon Ikan Tuna",
    slug: "abon-ikan-tuna",
    description: "Abon ikan tuna kaya akan Omega 3. Diproses sedemikian rupa sehingga tidak amis, menonjolkan kelezatan daging ikan tuna segar berkualitas tinggi.",
    price: 42000,
    weight: "100g",
    images: [
      "https://picsum.photos/seed/abon-ikan-tuna-1/600/400",
      "https://picsum.photos/seed/abon-ikan-tuna-2/600/400"
    ],
    category: "Abon Ikan",
    spiceLevel: 1,
    stock: 65,
    rating: 4.9,
    reviewCount: 210,
    badge: "New",
    variants: [
      { weight: "100g", price: 42000 },
      { weight: "250g", price: 100000 }
    ]
  },
  {
    id: "abon-sapi-manis",
    name: "Abon Sapi Manis Legit",
    slug: "abon-sapi-manis",
    description: "Varian abon sapi dengan cita rasa yang lebih manis, sangat disukai anak-anak. Dibuat menggunakan gula merah aren pilihan.",
    price: 36000,
    weight: "100g",
    images: [
      "https://picsum.photos/seed/abon-sapi-manis-1/600/400",
      "https://picsum.photos/seed/abon-sapi-manis-2/600/400"
    ],
    category: "Abon Sapi",
    spiceLevel: 0,
    stock: 80,
    rating: 4.6,
    reviewCount: 112,
    variants: [
      { weight: "100g", price: 36000 },
      { weight: "250g", price: 87000 }
    ]
  },
  {
    id: "abon-ayam-pedas",
    name: "Abon Ayam Pedas Daun Jeruk",
    slug: "abon-ayam-pedas",
    description: "Inovasi rasa baru! Abon ayam pedas dengan tambahan irisan daun jeruk yang memberikan aroma segar menggugah selera.",
    price: 33000,
    weight: "100g",
    images: [
      "https://picsum.photos/seed/abon-ayam-pedas-1/600/400",
      "https://picsum.photos/seed/abon-ayam-pedas-2/600/400"
    ],
    category: "Abon Ayam",
    spiceLevel: 3,
    stock: 50,
    rating: 4.8,
    reviewCount: 89,
    badge: "New",
    variants: [
      { weight: "100g", price: 33000 },
      { weight: "250g", price: 80000 }
    ]
  }
];
