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
      <h1 className="mb-4 text-2xl font-bold">Menú</h1>
      {!supabase && (
        <p className="mb-4 rounded-lg border border-yellow-400/40 bg-yellow-400/10 p-3 text-sm text-yellow-200">
          Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para cargar el menú.
        </p>
      )}
      {categories.map((category) => (
        <section key={category} className="mb-6">
          <h2 className="mb-3 text-lg text-neonBlue">{category}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {products.filter((product) => product.category === category).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
      <SendOrderButton />
    </Container>
  );
}
