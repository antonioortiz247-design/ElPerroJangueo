"use client";

import { create } from "zustand";
import type { Product, CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const found = state.items.find((item) => item.id === product.id);
      if (found) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          )
        };
      }
      return {
        items: [...state.items, { id: product.id, name: product.name, price: product.price, qty: 1 }]
      };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clear: () => set({ items: [] })
}));
