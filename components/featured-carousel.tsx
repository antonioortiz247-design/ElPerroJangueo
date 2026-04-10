"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/lib/types";

export function FeaturedCarousel({ items }: { items: Product[] }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="neon-card min-w-[220px] p-3"
          >
            <div className="relative mb-2 h-36 w-full overflow-hidden rounded-xl">
              <Image src={item.image_url} alt={item.name} fill className="object-cover" loading="lazy" />
            </div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-neonBlue">${item.price.toFixed(2)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
