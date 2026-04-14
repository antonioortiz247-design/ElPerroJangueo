"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { bootstrapLocalDb, fileToDataUrl, localDb } from "@/lib/local-storage-db";
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

  const load = () => {
    setProducts(localDb.getProducts());
  };

  useEffect(() => {
    bootstrapLocalDb();
    load();
  }, []);

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const image_url = await fileToDataUrl(file);
    setForm((prev) => ({ ...prev, image_url }));
  };

  const submit = () => {
    const item: Product = { id: crypto.randomUUID(), ...form };
    const updated = [item, ...localDb.getProducts()];
    localDb.saveProducts(updated);
    setForm(emptyForm);
    load();
  };

  const remove = (id: string) => {
    localDb.saveProducts(localDb.getProducts().filter((item) => item.id !== id));
    load();
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Productos (LocalStorage)</h1>
      <div className="neon-card mb-5 grid gap-2 p-3 sm:grid-cols-2">
        <input placeholder="name" className="rounded bg-white/10 p-2" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
        <input placeholder="price" className="rounded bg-white/10 p-2" type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) || 0 }))} />
        <select className="rounded bg-white/10 p-2" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
        <input placeholder="image_url" className="rounded bg-white/10 p-2" value={form.image_url} onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))} />
        <label className="rounded border border-white/10 p-2 text-sm text-white/80">
          Subir imagen desde dispositivo
          <input type="file" accept="image/*" onChange={onFile} className="mt-1 block w-full text-xs" />
        </label>
        <input placeholder="description" className="rounded bg-white/10 p-2 sm:col-span-2" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))} />
          Activo
        </label>
        <button className="rounded bg-neonBlue p-2 text-black" onClick={submit}>Crear</button>
      </div>

      <div className="space-y-2">
        {products.map((p) => (
          <div key={p.id} className="neon-card flex items-center justify-between gap-3 p-3">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded">
                <Image src={p.image_url} alt={p.name} fill className="object-cover" />
              </div>
              <p>{p.name} - ${p.price}</p>
            </div>
            <button onClick={() => remove(p.id)} className="text-red-400">Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
