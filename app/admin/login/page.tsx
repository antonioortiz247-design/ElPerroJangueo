"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { bootstrapAdminCredentials, getAdminCredentials, loginAsAdmin } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [defaultUser, setDefaultUser] = useState<{ email: string; password: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    bootstrapAdminCredentials();
    setDefaultUser(getAdminCredentials());
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = loginAsAdmin(email, password);
    if (!ok) {
      setError("Credenciales inválidas");
      return;
    }
    router.push("/admin/dashboard");
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border border-white/10 p-5">
      <h1 className="mb-4 text-xl font-bold">Admin Login (Local)</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded bg-white/10 p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded bg-white/10 p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="w-full rounded bg-neonBlue p-2 font-semibold text-black">Entrar</button>
      </form>

      {defaultUser && (
        <div className="mt-4 rounded-lg border border-neonBlue/30 bg-neonBlue/10 p-3 text-xs text-white/80">
          <p className="mb-1 font-semibold text-neonBlue">Acceso administrador por defecto:</p>
          <p>Email: {defaultUser.email}</p>
          <p>Password: {defaultUser.password}</p>
        </div>
      )}
    </div>
  );
}
