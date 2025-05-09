import type { Product } from "@/types/product"

// Datos de productos estáticos
// Catálogo ampliado de productos relacionados con café
export const products: Product[] = [
  {
    id: "v60-pour-over",
    name: "V60 Pour Over",
    price: 45.99,
    formattedPrice: "$45.99",
    image: "/v60_600x900.jpg",
    description:
      "Cafetera de goteo para una extracción perfecta. Diseño elegante y funcional que resalta los sabores más sutiles del café.",
    category: "Cafeteras",
    featured: true,
    variants: [
      {
        color: "Negro",
        colorCode: "#000000",
        image: "/api/placeholder/600/600",
        stock: 10,
      },
      {
        color: "Blanco",
        colorCode: "#FFFFFF",
        image: "/api/placeholder/600/600",
        stock: 5,
      },
      {
        color: "Transparente",
        colorCode: "#CCCCCC",
        image: "/api/placeholder/600/600",
        stock: 8,
      },
    ],
    width: 600,
    height: 900,
  },
  {
    id: "gooseneck-kettle",
    name: "Pava Eléctrica Gooseneck",
    price: 79.99,
    formattedPrice: "$79.99",
    image: "/pava_600x900.jpg",
    description:
      "Control preciso de temperatura y flujo de agua. Ideal para métodos de preparación manual como pour over y aeropress.",
    category: "Accesorios",
    featured: true,
    variants: [
      {
        color: "Acero Inoxidable",
        colorCode: "#C0C0C0",
        image: "/api/placeholder/600/600",
        stock: 5,
      },
      {
        color: "Negro Mate",
        colorCode: "#1A1A1A",
        image: "/api/placeholder/600/600",
        stock: 3,
      },
    ],
    width: 600,
    height: 900,
  },
  {
    id: "french-press",
    name: "French Press Clásica",
    price: 34.99,
    formattedPrice: "$34.99",
    image: "/french_600x900.jpg",
    description:
      "Método de inmersión que produce un café con cuerpo y sabor intenso. Fácil de usar y limpiar, perfecta para principiantes.",
    category: "Cafeteras",
    featured: true,
    variants: [
      {
        color: "Cobre",
        colorCode: "#B87333",
        image: "/api/placeholder/600/600",
        stock: 8,
      },
      {
        color: "Plateado",
        colorCode: "#C0C0C0",
        image: "/api/placeholder/600/600",
        stock: 12,
      },
    ],
    width: 600,
    height: 900,
  },
  {
    id: "chemex",
    name: "Cafetera Chemex",
    price: 48.50,
    formattedPrice: "$48.50",
    image: "/chemex.jpg",
    description:
      "Icónica cafetera de filtro que combina elegancia y funcionalidad. Produce un café limpio y destacando notas delicadas.",
    category: "Cafeteras",
    featured: false,
    width: 600,
    height: 900,
  },
  {
    id: "burr-grinder",
    name: "Molinillo de Muelas",
    price: 159.99,
    formattedPrice: "$159.99",
    image: "/grinder_600x900.jpg",
    description:
      "Molinillo eléctrico con muelas cónicas de acero. 40 ajustes de molienda para cualquier método de preparación, desde espresso hasta french press.",
    category: "Accesorios",
    featured: true,
    variants: [
      {
        color: "Negro",
        colorCode: "#000000",
        image: "/api/placeholder/600/600",
        stock: 6,
      },
      {
        color: "Plata",
        colorCode: "#C0C0C0",
        image: "/api/placeholder/600/600",
        stock: 4,
      },
    ],
    width: 600,
    height: 900,
  },
  {
    id: "coffee-jar",
    name: "Jarra de Café",
    price: 32.5,
    formattedPrice: "$32.50",
    image: "/jarra_600x900.jpg",
    description:
      "Elegante jarra para servir café recién preparado. Mantiene la temperatura ideal y presenta tu café con estilo.",
    category: "Accesorios",
    featured: false,
    width: 600,
    height: 900,
  },
  {
    id: "aeropress",
    name: "AeroPress",
    price: 29.95,
    formattedPrice: "$29.95",
    image: "/aeropress_600x900.jpg",
    description:
      "Sistema de preparación versátil y portátil. Utiliza presión para extraer un café concentrado con baja acidez y amargor.",
    category: "Cafeteras",
    featured: false,
    width: 600,
    height: 900,
  },
  {
    id: "moka-pot",
    name: "Cafetera Moka Italiana",
    price: 28.50,
    formattedPrice: "$28.50",
    image: "/moka_600x900.jpg",
    description:
      "Cafetera italiana clásica que utiliza vapor a presión. Produce un café intenso similar al espresso, perfecto para amantes del café fuerte.",
    category: "Cafeteras",
    featured: false,
    variants: [
      {
        color: "Aluminio",
        colorCode: "#A9A9A9",
        image: "/api/placeholder/600/600",
        stock: 15,
      },
      {
        color: "Negro",
        colorCode: "#000000",
        image: "/api/placeholder/600/600",
        stock: 7,
      },
    ],
    width: 600,
    height: 900,
  },
  {
    id: "latte-art-pitcher",
    name: "Jarra para Latte Art",
    price: 24.99,
    formattedPrice: "$24.99",
    image: "/api/placeholder/600/600",
    description:
      "Jarra de acero inoxidable diseñada específicamente para crear hermosos diseños de latte art. Pico vertedor de precisión.",
    category: "Accesorios",
    featured: false,
    width: 600,
    height: 900,
  },
  {
    id: "precision-scale",
    name: "Báscula de Precisión",
    price: 39.99,
    formattedPrice: "$39.99",
    image: "/scale_600x900.jpg",
    description:
      "Báscula digital con precisión de 0.1g y temporizador integrado. Esencial para preparaciones consistentes y de alta calidad.",
    category: "Accesorios",
    featured: true,
    width: 600,
    height: 900,
  },
  {
    id: "coffee-storage",
    name: "Contenedor Hermético para Café",
    price: 22.99,
    formattedPrice: "$22.99",
    image: "/contenedor_600x900.jpg",
    description:
      "Contenedor con válvula de desgasificación que mantiene el café fresco por más tiempo, protegiéndolo del oxígeno, la luz y la humedad.",
    category: "Accesorios",
    featured: false,
    variants: [
      {
        color: "Negro",
        colorCode: "#000000",
        image: "/api/placeholder/600/600",
        stock: 10,
      },
      {
        color: "Transparente",
        colorCode: "#CCCCCC",
        image: "/api/placeholder/600/600",
        stock: 8,
      },
    ],
    width: 600,
    height: 900,
  },
  {
    id: "cold-brew-maker",
    name: "Sistema de Cold Brew",
    price: 36.99,
    formattedPrice: "$36.99",
    image: "/api/placeholder/600/600",
    description:
      "Jarra con filtro integrado para preparar café frío de extracción lenta. Produce un café suave y dulce con baja acidez, perfecto para el verano.",
    category: "Cafeteras",
    featured: true,
    width: 600,
    height: 900,
  }
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
