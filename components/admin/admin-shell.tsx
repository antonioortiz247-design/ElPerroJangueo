import Link from "next/link";

const links = [
  ["Dashboard", "/admin/dashboard"],
  ["Productos", "/admin/products"],
  ["Pedidos", "/admin/orders"],
  ["Anuncios", "/admin/announcements"],
  ["Galería", "/admin/gallery"],
  ["Ajustes", "/admin/settings"]
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-[220px,1fr]">
      <aside className="neon-card h-fit p-3">
        <p className="mb-2 font-bold">Admin</p>
        <nav className="space-y-2 text-sm">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="block rounded px-2 py-1 hover:bg-white/10">{label}</Link>
          ))}
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
