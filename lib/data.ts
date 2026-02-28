export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
}

export interface Restaurant {
  id: string
  name: string
  description: string
  cuisine: string
  rating: number
  address: string
  phone: string
  hours: string
  image: string
  lat: number
  lng: number
  menu: MenuItem[]
}

export const restaurants: Restaurant[] = [
  {
    id: "la-alhambra-dorada",
    name: "La Alhambra Dorada",
    description:
      "Cocina tradicional granadina con un toque contemporáneo, inspirada en la riqueza cultural de la Alhambra. Disfruta de platos elaborados con ingredientes locales en un ambiente elegante.",
    cuisine: "Cocina Granadina",
    rating: 4.8,
    address: "Calle Reyes Católicos, 12, Granada",
    phone: "+34 958 123 456",
    hours: "13:00 - 23:30",
    image: "/images/restaurant-alhambra.jpg",
    lat: 37.1760,
    lng: -3.5988,
    menu: [
      {
        id: "ad-1",
        name: "Habas con Jamón",
        description: "Habas frescas salteadas con jamón ibérico, ajo y aceite de oliva virgen extra",
        price: 12.50,
        category: "Entrantes",
      },
      {
        id: "ad-2",
        name: "Remojón Granadino",
        description: "Ensalada tradicional de naranja, bacalao, aceitunas y huevo duro",
        price: 10.00,
        category: "Entrantes",
      },
      {
        id: "ad-3",
        name: "Tortilla del Sacromonte",
        description: "La famosa tortilla granadina con sesos, criadillas, jamón y pimientos",
        price: 14.00,
        category: "Entrantes",
      },
      {
        id: "ad-4",
        name: "Choto al Ajillo",
        description: "Cabrito joven cocinado al ajillo con patatas a lo pobre",
        price: 18.50,
        category: "Principales",
      },
      {
        id: "ad-5",
        name: "Paella Nazarí",
        description: "Arroz con mariscos frescos, azafrán de La Mancha y verduras de la vega",
        price: 22.00,
        category: "Principales",
      },
      {
        id: "ad-6",
        name: "Solomillo a la Brasa",
        description: "Solomillo de ternera a la brasa con reducción de vino tinto y setas",
        price: 24.00,
        category: "Principales",
      },
      {
        id: "ad-7",
        name: "Piononos de Santa Fe",
        description: "El dulce más emblemático de Granada, elaborado artesanalmente",
        price: 6.50,
        category: "Postres",
      },
      {
        id: "ad-8",
        name: "Leche Frita con Canela",
        description: "Crema frita con canela y azúcar, servida con helado de vainilla",
        price: 7.00,
        category: "Postres",
      },
      {
        id: "ad-9",
        name: "Vino Tinto de la Casa",
        description: "Selección de vino tinto de bodegas locales de la región",
        price: 4.50,
        category: "Bebidas",
      },
      {
        id: "ad-10",
        name: "Sangría Artesanal",
        description: "Sangría elaborada con frutas frescas y vino de la tierra",
        price: 5.00,
        category: "Bebidas",
      },
    ],
  },
  {
    id: "el-carmen-del-albaicin",
    name: "El Carmen del Albaicín",
    description:
      "Un rincón con alma en el corazón del Albaicín. Tapas creativas y platos de autor en un carmen con vistas a la Alhambra y jardines centenarios.",
    cuisine: "Tapas Creativas",
    rating: 4.6,
    address: "Placeta de San Nicolás, 3, Granada",
    phone: "+34 958 234 567",
    hours: "12:30 - 00:00",
    image: "/images/restaurant-carmen.jpg",
    lat: 37.1813,
    lng: -3.5926,
    menu: [
      {
        id: "ca-1",
        name: "Croquetas de Jamón Ibérico",
        description: "Croquetas cremosas de jamón ibérico con bechamel casera",
        price: 9.00,
        category: "Tapas",
      },
      {
        id: "ca-2",
        name: "Salmorejo Cordobés",
        description: "Crema fría de tomate con taquitos de jamón y huevo duro",
        price: 7.50,
        category: "Tapas",
      },
      {
        id: "ca-3",
        name: "Pulpo a la Gallega",
        description: "Pulpo tierno sobre cama de patata con pimentón de la Vera",
        price: 13.00,
        category: "Tapas",
      },
      {
        id: "ca-4",
        name: "Gambas al Pil Pil",
        description: "Gambas salteadas en aceite de oliva con ajo y guindilla",
        price: 14.50,
        category: "Tapas",
      },
      {
        id: "ca-5",
        name: "Rabo de Toro Estofado",
        description: "Rabo de toro cocinado a fuego lento con verduras y vino tinto",
        price: 19.00,
        category: "Principales",
      },
      {
        id: "ca-6",
        name: "Bacalao a la Miel de Caña",
        description: "Lomo de bacalao con miel de caña de Frigiliana y almendras",
        price: 17.50,
        category: "Principales",
      },
      {
        id: "ca-7",
        name: "Cordero a Baja Temperatura",
        description: "Paletilla de cordero lechal cocinada 12 horas con romero y tomillo",
        price: 21.00,
        category: "Principales",
      },
      {
        id: "ca-8",
        name: "Tarta de Queso Manchego",
        description: "Tarta cremosa de queso manchego con compota de higos",
        price: 8.00,
        category: "Postres",
      },
      {
        id: "ca-9",
        name: "Tinto de Verano",
        description: "Vino tinto con gaseosa y limón, refrescante y ligero",
        price: 3.50,
        category: "Bebidas",
      },
      {
        id: "ca-10",
        name: "Cerveza Alhambra Reserva",
        description: "Cerveza artesanal premium de Granada, suave y equilibrada",
        price: 3.00,
        category: "Bebidas",
      },
    ],
  },
  {
    id: "mirador-de-san-nicolas",
    name: "Mirador de San Nicolás",
    description:
      "Gastronomía moderna con raíces andaluzas. Terraza panorámica con las mejores vistas de Granada. Cocina de mercado con ingredientes de temporada.",
    cuisine: "Cocina de Autor",
    rating: 4.9,
    address: "Mirador de San Nicolás, s/n, Granada",
    phone: "+34 958 345 678",
    hours: "13:00 - 01:00",
    image: "/images/restaurant-mirador.jpg",
    lat: 37.1818,
    lng: -3.5927,
    menu: [
      {
        id: "ms-1",
        name: "Tartar de Atún Rojo",
        description: "Atún rojo de almadraba con aguacate, soja y sésamo",
        price: 16.00,
        category: "Entrantes",
      },
      {
        id: "ms-2",
        name: "Gazpacho de Cereza",
        description: "Gazpacho de cerezas del Valle de Lecrín con queso de cabra",
        price: 11.00,
        category: "Entrantes",
      },
      {
        id: "ms-3",
        name: "Ensalada Tropical",
        description: "Mix de lechugas con mango, aguacate, langostinos y vinagreta cítrica",
        price: 13.50,
        category: "Entrantes",
      },
      {
        id: "ms-4",
        name: "Arroz Negro con Chipirones",
        description: "Arroz negro con tinta de calamar, chipirones y alioli de azafrán",
        price: 20.00,
        category: "Principales",
      },
      {
        id: "ms-5",
        name: "Magret de Pato",
        description: "Pechuga de pato con salsa de frutos rojos y puré de boniato",
        price: 23.00,
        category: "Principales",
      },
      {
        id: "ms-6",
        name: "Lubina a la Espalda",
        description: "Lubina salvaje a la espalda con verduras de temporada",
        price: 25.00,
        category: "Principales",
      },
      {
        id: "ms-7",
        name: "Coulant de Chocolate",
        description: "Coulant de chocolate negro 70% con helado de frambuesa",
        price: 9.00,
        category: "Postres",
      },
      {
        id: "ms-8",
        name: "Crema Catalana",
        description: "Crema catalana con azúcar caramelizado y frutos del bosque",
        price: 7.50,
        category: "Postres",
      },
      {
        id: "ms-9",
        name: "Cóctel Alhambra Sunset",
        description: "Gin tonic premium con botánicos granadinos y twist de naranja",
        price: 10.00,
        category: "Bebidas",
      },
      {
        id: "ms-10",
        name: "Agua de Valencia",
        description: "Combinado de cava, zumo de naranja y vodka",
        price: 8.00,
        category: "Bebidas",
      },
    ],
  },
]
