import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Premium Noise-Canceling Headphones",
    price: 299.99,
    description: "Experience immersive sound with our latest noise-canceling technology. Perfect for travel and work.",
    category: "Electronics",
    image: "https://picsum.photos/400/400?random=1",
    rating: { rate: 4.8, count: 120 }
  },
  {
    id: 2,
    title: "Ergonomic Office Chair",
    price: 159.50,
    description: "Designed for comfort and support during long work hours. Adjustable height and lumbar support.",
    category: "Furniture",
    image: "https://picsum.photos/400/400?random=2",
    rating: { rate: 4.5, count: 85 }
  },
  {
    id: 3,
    title: "Minimalist Analog Watch",
    price: 129.00,
    description: "A timeless classic featuring a genuine leather strap and a scratch-resistant glass face.",
    category: "Accessories",
    image: "https://picsum.photos/400/400?random=3",
    rating: { rate: 4.6, count: 210 }
  },
  {
    id: 4,
    title: "Smart Fitness Tracker",
    price: 89.99,
    description: "Track your steps, heart rate, and sleep quality. Water-resistant and 7-day battery life.",
    category: "Electronics",
    image: "https://picsum.photos/400/400?random=4",
    rating: { rate: 4.2, count: 340 }
  },
  {
    id: 5,
    title: "Organic Cotton T-Shirt",
    price: 24.99,
    description: "Soft, breathable, and eco-friendly. Available in multiple earthy tones.",
    category: "Clothing",
    image: "https://picsum.photos/400/400?random=5",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 6,
    title: "Professional DSLR Camera",
    price: 1299.00,
    description: "Capture stunning photos and 4K video. Includes 18-55mm lens kit.",
    category: "Electronics",
    image: "https://picsum.photos/400/400?random=6",
    rating: { rate: 4.9, count: 60 }
  },
  {
    id: 7,
    title: "Ceramic Coffee Pour-Over Set",
    price: 45.00,
    description: "Brew the perfect cup of coffee at home with this artisanal ceramic set.",
    category: "Home",
    image: "https://picsum.photos/400/400?random=7",
    rating: { rate: 4.8, count: 150 }
  },
  {
    id: 8,
    title: "Wireless Mechanical Keyboard",
    price: 110.00,
    description: "Tactile switches with customizable RGB lighting. Connects via Bluetooth or USB-C.",
    category: "Electronics",
    image: "https://picsum.photos/400/400?random=8",
    rating: { rate: 4.6, count: 180 }
  },
  {
    id: 9,
    title: "Travel Backpack Water Resistant",
    price: 65.00,
    description: "Spacious compartments with a laptop sleeve. Ideal for hiking or daily commute.",
    category: "Accessories",
    image: "https://picsum.photos/400/400?random=9",
    rating: { rate: 4.4, count: 300 }
  },
  {
    id: 10,
    title: "Aromatherapy Diffuser",
    price: 35.99,
    description: "Create a calming atmosphere with essential oils. LED mood lighting included.",
    category: "Home",
    image: "https://picsum.photos/400/400?random=10",
    rating: { rate: 4.3, count: 120 }
  }
];

export const CATEGORIES = ["All", "Electronics", "Clothing", "Home", "Accessories", "Furniture"];
