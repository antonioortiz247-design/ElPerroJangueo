import Link from "next/link";

const nav = [
  ["Inicio", "/"],
  ["Menú", "/menu"],
  ["Galería", "/gallery"],
  ["Social", "/social"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-black uppercase tracking-[0.22em] text-neonBlue">
          El Perro Jangueo
        </Link>
        <nav className="flex gap-2 text-xs sm:text-sm">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-white/10 px-3 py-1 text-white/80 transition hover:border-neonBlue/50 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
