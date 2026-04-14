"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { bootstrapLocalDb, fileToDataUrl, localDb } from "@/lib/local-storage-db";

interface GalleryItem { id: string; image_url: string }

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  const load = () => setItems(localDb.getGallery());

  useEffect(() => {
    bootstrapLocalDb();
    load();
  }, []);

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const encoded = await Promise.all(files.map(async (file) => ({ id: crypto.randomUUID(), image_url: await fileToDataUrl(file) })));
    localDb.saveGallery([...encoded, ...localDb.getGallery()]);
    load();
  };

  const remove = (id: string) => {
    localDb.saveGallery(localDb.getGallery().filter((item) => item.id !== id));
    load();
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Galería (LocalStorage)</h1>
      <label className="mb-4 block rounded border border-white/10 p-3 text-sm text-white/80">
        Subir varias imágenes desde dispositivo
        <input type="file" accept="image/*" multiple onChange={upload} className="mt-1 block w-full text-xs" />
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((img) => (
          <div key={img.id} className="neon-card overflow-hidden p-2">
            <div className="relative mb-2 h-24 w-full overflow-hidden rounded">
              <Image src={img.image_url} alt="Galería" fill className="object-cover" />
            </div>
            <button onClick={() => remove(img.id)} className="w-full rounded bg-red-500/15 py-1 text-xs text-red-300">Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
