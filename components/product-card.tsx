"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.article whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="neon-card group overflow-hidden p-3">
      <div className="relative mb-3 h-40 overflow-hidden rounded-xl">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        <span className="rounded-full bg-neonBlue/15 px-2 py-1 text-xs font-semibold text-neonBlue">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <p className="text-xs text-white/65">{product.description}</p>

      <button
        className="mt-3 w-full rounded-lg bg-neonPurple px-3 py-2 text-sm font-medium transition hover:bg-neonPink"
        onClick={() => addItem(product)}
      >
        Agregar al carrito
      </button>
    </motion.article>
  );
}
