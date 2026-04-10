"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

interface Announcement { id: string; text: string; active: boolean }

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [text, setText] = useState("");

  const load = async () => {
    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase.from("announcements").select("*");
    setItems((data ?? []) as Announcement[]);
  };

  useEffect(() => { void load(); }, []);

  const add = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.from("announcements").insert({ text, active: true });
    setText("");
    await load();
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Anuncios</h1>
      <div className="mb-4 flex gap-2">
        <input className="flex-1 rounded bg-white/10 p-2" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="rounded bg-neonBlue px-3 text-black" onClick={add}>Guardar</button>
      </div>
      {items.map((item) => (
        <div key={item.id} className="neon-card mb-2 p-3">{item.text}</div>
      ))}
    </div>
  );
}
