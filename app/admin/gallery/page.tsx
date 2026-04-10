"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

interface GalleryItem { id: string; image_url: string }

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  const load = async () => {
    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase.from("gallery").select("*");
    setItems((data ?? []) as GalleryItem[]);
  };

  useEffect(() => { void load(); }, []);

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const supabase = createSupabaseBrowserClient();
    const path = `gallery/${Date.now()}-${file.name}`;
    await supabase.storage.from("gallery").upload(path, file, { upsert: true });
    const { data } = supabase.storage.from("gallery").getPublicUrl(path);
    await supabase.from("gallery").insert({ image_url: data.publicUrl });
    await load();
  };

  const remove = async (id: string) => {
    const supabase = createSupabaseBrowserClient();
    await supabase.from("gallery").delete().eq("id", id);
    await load();
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Galería</h1>
      <input type="file" accept="image/*" onChange={upload} className="mb-4" />
      <div className="space-y-2">
        {items.map((img) => (
          <div key={img.id} className="neon-card flex items-center justify-between p-3">
            <p className="truncate text-sm">{img.image_url}</p>
            <button onClick={() => remove(img.id)} className="text-red-400">Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
