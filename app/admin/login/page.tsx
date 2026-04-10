"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    router.push("/admin/dashboard");
  };

  return (
    <div className="mx-auto mt-20 max-w-sm rounded-xl border border-white/10 p-5">
      <h1 className="mb-4 text-xl font-bold">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded bg-white/10 p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded bg-white/10 p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="w-full rounded bg-neonBlue p-2 font-semibold text-black">Entrar</button>
      </form>
    </div>
  );
}
