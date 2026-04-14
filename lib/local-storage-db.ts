"use client";

import type { Announcement, Order, Product } from "@/lib/types";

const KEYS = {
  products: "epj_products",
  announcements: "epj_announcements",
  gallery: "epj_gallery",
  orders: "epj_orders"
} as const;

const demoProducts: Product[] = [
  {
    id: "demo-product-1",
    name: "Mojito Clásico",
    price: 7.5,
    category: "Mojitos",
    description: "Hierbabuena fresca y lima",
    image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd",
    active: true
  },
  {
    id: "demo-product-2",
    name: "Azulito Neon",
    price: 9,
    category: "Azulitos",
    description: "Azul vibrante con cítricos",
    image_url: "https://images.unsplash.com/photo-1536935338788-846bb9981813",
    active: true
  }
];

const demoAnnouncements: Announcement[] = [
  {
    id: "demo-announcement-1",
    text: "🔥 Happy hour 7PM a 9PM",
    active: true,
    image_url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187"
  }
];

const demoGallery = [
  { id: "demo-gallery-1", image_url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187" },
  { id: "demo-gallery-2", image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd" }
];

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const write = <T,>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const bootstrapLocalDb = () => {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(KEYS.products)) write(KEYS.products, demoProducts);
  if (!localStorage.getItem(KEYS.announcements)) write(KEYS.announcements, demoAnnouncements);
  if (!localStorage.getItem(KEYS.gallery)) write(KEYS.gallery, demoGallery);
  if (!localStorage.getItem(KEYS.orders)) write(KEYS.orders, [] as Order[]);
};

export const localDb = {
  getProducts: () => read<Product[]>(KEYS.products, []),
  saveProducts: (products: Product[]) => write(KEYS.products, products),
  getAnnouncements: () => read<Announcement[]>(KEYS.announcements, []),
  saveAnnouncements: (items: Announcement[]) => write(KEYS.announcements, items),
  getGallery: () => read<{ id: string; image_url: string }[]>(KEYS.gallery, []),
  saveGallery: (items: { id: string; image_url: string }[]) => write(KEYS.gallery, items),
  getOrders: () => read<Order[]>(KEYS.orders, []),
  saveOrders: (orders: Order[]) => write(KEYS.orders, orders)
};

export const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
    reader.readAsDataURL(file);
  });
