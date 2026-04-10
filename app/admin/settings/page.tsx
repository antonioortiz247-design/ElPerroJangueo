"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

export default function AdminSettingsPage() {
  const [whatsapp_phone, setPhone] = useState("");
  const [default_message, setMessage] = useState("Hola, quiero pedir:");

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowserClient();
      const { data } = await supabase.from("settings").select("*").limit(1).maybeSingle();
      if (data) {
        setPhone(data.whatsapp_phone || "");
        setMessage(data.default_message || "");
      }
    };
    void load();
  }, []);

  const save = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.from("settings").upsert({ id: 1, whatsapp_phone, default_message });
  };

  return (
    <div className="max-w-lg space-y-3">
      <h1 className="text-xl font-bold">Settings</h1>
      <input className="w-full rounded bg-white/10 p-2" placeholder="whatsapp_phone" value={whatsapp_phone} onChange={(e) => setPhone(e.target.value)} />
      <textarea className="w-full rounded bg-white/10 p-2" placeholder="default_message" value={default_message} onChange={(e) => setMessage(e.target.value)} />
      <button className="rounded bg-neonBlue px-3 py-2 text-black" onClick={save}>Guardar</button>
    </div>
  );
}
