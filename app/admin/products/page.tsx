"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";
import type { Category, Product } from "@/lib/types";

interface ProductForm {
  name: string;
  price: number;
  category: Category;
  description: string;
  image_url: string;
  active: boolean;
}

const emptyForm: ProductForm = {
  name: "",
  price: 0,
  category: "Mojitos",
  description: "",
  image_url: "",
  active: true
};

const categories: Category[] = ["Mojitos", "Azulitos", "Especiales", "Promos"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);

  const load = async () => {
    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts((data ?? []) as Product[]);
  };

  useEffect(() => {
    void load();
  }, []);

  const submit = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.from("products").insert(form);
    setForm(emptyForm);
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
        <input
          placeholder="name"
          className="rounded bg-white/10 p-2"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />
        <input
          placeholder="price"
          className="rounded bg-white/10 p-2"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) || 0 }))}
        />
        <select
          className="rounded bg-white/10 p-2"
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as Category }))}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          placeholder="image_url"
          className="rounded bg-white/10 p-2"
          value={form.image_url}
          onChange={(e) => setForm((prev) => ({ ...prev, image_url: e.target.value }))}
        />
        <input
          placeholder="description"
          className="rounded bg-white/10 p-2 sm:col-span-2"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
          />
          Activo
        </label>
        <button className="rounded bg-neonBlue p-2 text-black" onClick={submit}>
          Crear
        </button>
      </div>
      <div className="space-y-2">
        {products.map((p) => (
          <div key={p.id} className="neon-card flex items-center justify-between p-3">
            <p>
              {p.name} - ${p.price}
            </p>
            <button onClick={() => remove(p.id)} className="text-red-400">
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
