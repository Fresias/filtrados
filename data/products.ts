import type { Product } from "@/types/product"

// Datos de productos estáticos
// Esta es la forma más simple y segura para un catálogo pequeño
export const products: Product[] = [
  {
    id: "v60-pour-over",
    name: "V60 Pour Over",
    price: 45.99,
    formattedPrice: "$45.99",
    image: "/placeholder.svg?key=pv8sj",
    description:
      "Cafetera de goteo para una extracción perfecta. Diseño elegante y funcional que resalta los sabores más sutiles del café.",
    category: "Cafeteras",
    featured: true,
    variants: [
      {
        color: "Negro",
        colorCode: "#000000",
        image: "/placeholder.svg?key=pv8sj",
        stock: 10,
      },
      {
        color: "Blanco",
        colorCode: "#FFFFFF",
        image: "/placeholder.svg?key=pv8sj",
        stock: 5,
      },
      {
        color: "Transparente",
        colorCode: "#CCCCCC",
        image: "/placeholder.svg?key=pv8sj",
        stock: 8,
      },
    ],
    width: 600,
    height: 600,
  },
  {
    id: "gooseneck-kettle",
    name: "Pava Eléctrica Gooseneck",
    price: 79.99,
    formattedPrice: "$79.99",
    image: "/placeholder.svg?key=wx9dm",
    description:
      "Control preciso de temperatura y flujo de agua. Ideal para métodos de preparación manual como pour over y aeropress.",
    category: "Accesorios",
    featured: true,
    variants: [
      {
        color: "Acero Inoxidable",
        colorCode: "#C0C0C0",
        image: "/placeholder.svg?key=wx9dm",
        stock: 5,
      },
      {
        color: "Negro Mate",
        colorCode: "#1A1A1A",
        image: "/placeholder.svg?key=wx9dm",
        stock: 3,
      },
    ],
    width: 600,
    height: 600,
  },
  {
    id: "coffee-jar",
    name: "Jarra de Café",
    price: 32.5,
    formattedPrice: "$32.50",
    image: "/coffee-server-jar.png",
    description:
      "Elegante jarra para servir café recién preparado. Mantiene la temperatura ideal y presenta tu café con estilo.",
    category: "Accesorios",
    featured: false,
    width: 600,
    height: 600,
  },
  {
    id: "latte-art-pitcher",
    name: "Jarra para Latte Art",
    price: 24.99,
    formattedPrice: "$24.99",
    image: "/placeholder.svg?key=5bxsi",
    description:
      "Jarra de acero inoxidable diseñada específicamente para crear hermosos diseños de latte art. Pico vertedor de precisión.",
    category: "Accesorios",
    featured: false,
    width: 600,
    height: 600,
  },
  {
    id: "precision-scale",
    name: "Báscula de Precisión",
    price: 39.99,
    formattedPrice: "$39.99",
    image: "/coffee-scale.png",
    description:
      "Báscula digital con precisión de 0.1g y temporizador integrado. Esencial para preparaciones consistentes y de alta calidad.",
    category: "Accesorios",
    featured: true,
    width: 600,
    height: 600,
  },
]

// Funciones de utilidad para acceder a los productos
export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}
