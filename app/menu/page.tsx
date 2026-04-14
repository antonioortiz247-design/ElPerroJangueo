import { Container } from "@/components/ui/container";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { ProductCard } from "@/components/product-card";
import { SendOrderButton } from "@/components/send-order-button";
import type { Category, Product } from "@/lib/types";

const categories: Category[] = ["Mojitos", "Azulitos", "Especiales", "Promos"];

export default async function MenuPage() {
  const supabase = await createSupabaseServerClient();

  let products: Product[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("category");
    products = (data ?? []) as Product[];
  }

  return (
    <Container>
      <h1 className="neon-title mb-2 text-2xl sm:text-3xl">Menú</h1>
      <p className="mb-5 text-sm text-white/70">Escoge tus favoritos y envía el pedido por WhatsApp.</p>

      {!supabase && (
        <p className="mb-4 rounded-lg border border-yellow-400/40 bg-yellow-400/10 p-3 text-sm text-yellow-200">
          Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para cargar el menú.
        </p>
      )}

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
