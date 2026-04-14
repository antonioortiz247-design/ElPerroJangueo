"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product-card";
import { SendOrderButton } from "@/components/send-order-button";
import { bootstrapLocalDb, localDb } from "@/lib/local-storage-db";
import type { Category, Product } from "@/lib/types";

const categories: Category[] = ["Mojitos", "Azulitos", "Especiales", "Promos"];

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    bootstrapLocalDb();
    setProducts(localDb.getProducts().filter((item) => item.active));
  }, []);

  return (
    <Container>
      <h1 className="neon-title mb-2 text-2xl sm:text-3xl">Menú</h1>
      <p className="mb-5 text-sm text-white/70">Escoge tus favoritos y envía el pedido por WhatsApp.</p>

      {categories.map((category) => {
        const categoryItems = products.filter((product) => product.category === category);

        return (
          <section key={category} className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neonBlue">{category}</h2>
              <span className="text-xs text-white/50">{categoryItems.length} items</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categoryItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      <SendOrderButton />
    </Container>
  );
}
