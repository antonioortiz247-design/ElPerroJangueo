"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { Container } from "@/components/ui/container";
import { bootstrapLocalDb, localDb } from "@/lib/local-storage-db";
import type { Product } from "@/lib/types";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    bootstrapLocalDb();
    const products = localDb.getProducts().filter((item) => item.active);
    setFeaturedProducts(products.slice(0, 8));
  }, []);

  return (
    <Container>
      <AnnouncementBanner />

      <section className="neon-card relative mb-7 overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-neonPink/20 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-neonBlue/20 blur-3xl" />

        <div className="relative">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="neon-pill">Los mejores mojitos</span>
            <span className="neon-pill border-neonPink/40 bg-neonPink/10 text-neonPink">Entrega rápida</span>
          </div>

          <h1 className="neon-title mb-3 text-3xl leading-tight sm:text-5xl">El Perro Jangueo</h1>
          <p className="mb-5 max-w-2xl text-sm text-white/80 sm:text-base">
            Tu esquina de cocteles urbanos: mojitos, azulitos y especiales listos para janguear.
            Pide en segundos por WhatsApp.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/menu" className="neon-btn-primary">Ver menú</Link>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "18095551234"}`} className="neon-btn-outline">
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold uppercase tracking-wider text-neonBlue">Destacados</h2>
          <span className="text-xs text-white/60">Top de la noche</span>
        </div>
        <FeaturedCarousel items={featuredProducts} />
      </section>
    </Container>
  );
}
