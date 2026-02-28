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

export const defaultRestaurants: Restaurant[] = [
  {
    id: "la-alhambra-dorada",
    name: "La Alhambra Dorada",
    description:
      "Traditional Granada cuisine with a contemporary twist, inspired by the rich culture of the Alhambra. Enjoy dishes made with local ingredients in an elegant setting.",
    cuisine: "Granada Cuisine",
    rating: 4.8,
    address: "Calle Reyes Catolicos, 12, Granada",
    phone: "+34 958 123 456",
    hours: "1:00 PM - 11:30 PM",
    image: "/images/restaurant-alhambra.jpg",
    lat: 37.176,
    lng: -3.5988,
    menu: [
      {
        id: "ad-1",
        name: "Broad Beans with Ham",
        description: "Fresh broad beans sauteed with Iberian ham, garlic and extra virgin olive oil",
        price: 12.5,
        category: "Starters",
      },
      {
        id: "ad-2",
        name: "Granada Salad",
        description: "Traditional salad with orange, cod, olives and boiled egg",
        price: 10.0,
        category: "Starters",
      },
      {
        id: "ad-3",
        name: "Sacromonte Omelette",
        description: "The famous Granada omelette with ham and peppers",
        price: 14.0,
        category: "Starters",
      },
      {
        id: "ad-4",
        name: "Garlic Kid Goat",
        description: "Young goat cooked with garlic and rustic potatoes",
        price: 18.5,
        category: "Mains",
      },
      {
        id: "ad-5",
        name: "Nazari Paella",
        description: "Rice with fresh seafood, La Mancha saffron and garden vegetables",
        price: 22.0,
        category: "Mains",
      },
      {
        id: "ad-6",
        name: "Grilled Sirloin",
        description: "Grilled beef sirloin with red wine reduction and wild mushrooms",
        price: 24.0,
        category: "Mains",
      },
      {
        id: "ad-7",
        name: "Piononos de Santa Fe",
        description: "The most iconic sweet from Granada, handcrafted with care",
        price: 6.5,
        category: "Desserts",
      },
      {
        id: "ad-8",
        name: "Fried Custard with Cinnamon",
        description: "Fried custard with cinnamon and sugar, served with vanilla ice cream",
        price: 7.0,
        category: "Desserts",
      },
      {
        id: "ad-9",
        name: "House Red Wine",
        description: "Selection of red wine from local wineries in the region",
        price: 4.5,
        category: "Drinks",
      },
      {
        id: "ad-10",
        name: "Artisan Sangria",
        description: "Sangria made with fresh fruits and local wine",
        price: 5.0,
        category: "Drinks",
      },
    ],
  },
  {
    id: "el-carmen-del-albaicin",
    name: "El Carmen del Albaicin",
    description:
      "A soulful corner in the heart of the Albaicin. Creative tapas and signature dishes in a carmen with views of the Alhambra and centuries-old gardens.",
    cuisine: "Creative Tapas",
    rating: 4.6,
    address: "Placeta de San Nicolas, 3, Granada",
    phone: "+34 958 234 567",
    hours: "12:30 PM - 12:00 AM",
    image: "/images/restaurant-carmen.jpg",
    lat: 37.1813,
    lng: -3.5926,
    menu: [
      {
        id: "ca-1",
        name: "Iberian Ham Croquettes",
        description: "Creamy Iberian ham croquettes with homemade bechamel",
        price: 9.0,
        category: "Tapas",
      },
      {
        id: "ca-2",
        name: "Salmorejo",
        description: "Cold tomato cream with ham and boiled egg",
        price: 7.5,
        category: "Tapas",
      },
      {
        id: "ca-3",
        name: "Galician-Style Octopus",
        description: "Tender octopus on a bed of potato with smoked paprika",
        price: 13.0,
        category: "Tapas",
      },
      {
        id: "ca-4",
        name: "Garlic Prawns (Pil Pil)",
        description: "Prawns sauteed in olive oil with garlic and chili",
        price: 14.5,
        category: "Tapas",
      },
      {
        id: "ca-5",
        name: "Oxtail Stew",
        description: "Oxtail slow-cooked with vegetables and red wine",
        price: 19.0,
        category: "Mains",
      },
      {
        id: "ca-6",
        name: "Cod with Cane Honey",
        description: "Cod loin with cane honey from Frigiliana and almonds",
        price: 17.5,
        category: "Mains",
      },
      {
        id: "ca-7",
        name: "Slow-Cooked Lamb",
        description: "Lamb shoulder cooked for 12 hours with rosemary and thyme",
        price: 21.0,
        category: "Mains",
      },
      {
        id: "ca-8",
        name: "Manchego Cheesecake",
        description: "Creamy Manchego cheesecake with fig compote",
        price: 8.0,
        category: "Desserts",
      },
      {
        id: "ca-9",
        name: "Tinto de Verano",
        description: "Red wine with lemon soda, refreshing and light",
        price: 3.5,
        category: "Drinks",
      },
      {
        id: "ca-10",
        name: "Alhambra Reserva Beer",
        description: "Premium craft beer from Granada, smooth and balanced",
        price: 3.0,
        category: "Drinks",
      },
    ],
  },
  {
    id: "mirador-de-san-nicolas",
    name: "Mirador de San Nicolas",
    description:
      "Modern gastronomy with Andalusian roots. Panoramic terrace with the best views of Granada. Market cuisine with seasonal ingredients.",
    cuisine: "Signature Cuisine",
    rating: 4.9,
    address: "Mirador de San Nicolas, s/n, Granada",
    phone: "+34 958 345 678",
    hours: "1:00 PM - 1:00 AM",
    image: "/images/restaurant-mirador.jpg",
    lat: 37.1818,
    lng: -3.5927,
    menu: [
      {
        id: "ms-1",
        name: "Red Tuna Tartare",
        description: "Almadraba red tuna with avocado, soy and sesame",
        price: 16.0,
        category: "Starters",
      },
      {
        id: "ms-2",
        name: "Cherry Gazpacho",
        description: "Cherry gazpacho from Lecrin Valley with goat cheese",
        price: 11.0,
        category: "Starters",
      },
      {
        id: "ms-3",
        name: "Tropical Salad",
        description: "Mixed greens with mango, avocado, king prawns and citrus vinaigrette",
        price: 13.5,
        category: "Starters",
      },
      {
        id: "ms-4",
        name: "Black Rice with Baby Squid",
        description: "Squid ink rice with baby squid and saffron aioli",
        price: 20.0,
        category: "Mains",
      },
      {
        id: "ms-5",
        name: "Duck Breast Magret",
        description: "Duck breast with berry sauce and sweet potato puree",
        price: 23.0,
        category: "Mains",
      },
      {
        id: "ms-6",
        name: "Sea Bass a la Espalda",
        description: "Wild sea bass grilled with seasonal vegetables",
        price: 25.0,
        category: "Mains",
      },
      {
        id: "ms-7",
        name: "Chocolate Lava Cake",
        description: "Dark chocolate 70% lava cake with raspberry ice cream",
        price: 9.0,
        category: "Desserts",
      },
      {
        id: "ms-8",
        name: "Crema Catalana",
        description: "Crema catalana with caramelized sugar and forest berries",
        price: 7.5,
        category: "Desserts",
      },
      {
        id: "ms-9",
        name: "Alhambra Sunset Cocktail",
        description: "Premium gin tonic with Granada botanicals and orange twist",
        price: 10.0,
        category: "Drinks",
      },
      {
        id: "ms-10",
        name: "Agua de Valencia",
        description: "Cava, orange juice and vodka cocktail",
        price: 8.0,
        category: "Drinks",
      },
    ],
  },
]
