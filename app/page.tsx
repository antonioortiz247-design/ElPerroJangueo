import Link from "next/link";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { Container } from "@/components/ui/container";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Product } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const { data: featured } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .limit(8);

  const featuredProducts = (featured ?? []) as Product[];

  return (
    <Container>
      <AnnouncementBanner />
      <section className="mb-7 rounded-2xl bg-gradient-to-br from-neonPurple/30 via-neonPink/15 to-transparent p-5">
        <h1 className="mb-2 text-4xl font-black">El Perro Jangueo</h1>
        <p className="mb-4 text-white/80">Mojitos, azulitos y cocteles urbanos al instante.</p>
        <div className="flex gap-3">
          <Link href="/menu" className="rounded-xl bg-neonBlue px-4 py-2 font-semibold text-black">Ver menú</Link>
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "18095551234"}`} className="rounded-xl border border-neonPink px-4 py-2">Pedir por WhatsApp</a>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Destacados</h2>
        <FeaturedCarousel items={featuredProducts} />
      </section>
    </Container>
  );
}
