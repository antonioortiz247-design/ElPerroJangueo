"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import type { Announcement } from "@/lib/types";
import { bootstrapLocalDb, fileToDataUrl, localDb } from "@/lib/local-storage-db";

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const load = () => setItems(localDb.getAnnouncements());

  useEffect(() => {
    bootstrapLocalDb();
    load();
  }, []);

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUrl(await fileToDataUrl(file));
  };

  const add = () => {
    const item: Announcement = {
      id: crypto.randomUUID(),
      text,
      image_url: imageUrl,
      active: true
    };
    localDb.saveAnnouncements([item, ...localDb.getAnnouncements()]);
    setText("");
    setImageUrl("");
    load();
  };

  const remove = (id: string) => {
    localDb.saveAnnouncements(localDb.getAnnouncements().filter((item) => item.id !== id));
    load();
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Anuncios (LocalStorage)</h1>
      <div className="mb-4 grid gap-2">
        <input className="rounded bg-white/10 p-2" placeholder="Texto anuncio" value={text} onChange={(e) => setText(e.target.value)} />
        <input className="rounded bg-white/10 p-2" placeholder="image_url (opcional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <label className="rounded border border-white/10 p-2 text-sm text-white/80">
          Subir imagen desde dispositivo
          <input type="file" accept="image/*" onChange={onFile} className="mt-1 block w-full text-xs" />
        </label>
        <button className="rounded bg-neonBlue px-3 py-2 text-black" onClick={add}>Guardar</button>
      </div>
      {items.map((item) => (
        <div key={item.id} className="neon-card mb-3 overflow-hidden p-3">
          {item.image_url && (
            <div className="relative mb-2 h-28 w-full overflow-hidden rounded">
              <Image src={item.image_url} alt="Anuncio" fill className="object-cover" />
            </div>
          )}
          <div className="flex items-center justify-between gap-3">
            <p>{item.text}</p>
            <button onClick={() => remove(item.id)} className="text-red-400">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
