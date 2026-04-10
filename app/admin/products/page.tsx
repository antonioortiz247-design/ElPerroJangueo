"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";
import type { Product } from "@/lib/types";

const empty = { name: "", price: 0, category: "Mojitos", description: "", image_url: "", active: true };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<any>(empty);

  const load = async () => {
    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts((data ?? []) as Product[]);
  };

  useEffect(() => { void load(); }, []);

  const submit = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.from("products").insert(form);
    setForm(empty);
    await load();
  };

  const remove = async (id: string) => {
    const supabase = createSupabaseBrowserClient();
    await supabase.from("products").delete().eq("id", id);
    await load();
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Productos</h1>
      <div className="neon-card mb-5 grid gap-2 p-3 sm:grid-cols-2">
        {Object.keys(empty).map((key) => (
          <input key={key} placeholder={key} className="rounded bg-white/10 p-2" value={String(form[key as keyof typeof form])}
            onChange={(e) => setForm((f: any) => ({ ...f, [key]: key === "price" ? Number(e.target.value) : key === "active" ? e.target.value === "true" : e.target.value }))} />
        ))}
        <button className="rounded bg-neonBlue p-2 text-black" onClick={submit}>Crear</button>
      </div>
      <div className="space-y-2">
        {products.map((p) => (
          <div key={p.id} className="neon-card flex items-center justify-between p-3">
            <p>{p.name} - ${p.price}</p>
            <button onClick={() => remove(p.id)} className="text-red-400">Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
