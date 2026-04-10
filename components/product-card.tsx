"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <motion.article whileTap={{ scale: 0.98 }} className="neon-card p-3">
      <div className="relative mb-3 h-36 overflow-hidden rounded-xl">
        <Image src={product.image_url} alt={product.name} fill className="object-cover" loading="lazy" />
      </div>
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-xs text-white/70">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-neonBlue">${product.price.toFixed(2)}</span>
        <button
          className="rounded-lg bg-neonPurple px-3 py-1 text-sm"
          onClick={() => addItem(product)}
        >
          Agregar
        </button>
      </div>
    </motion.article>
  );
}
