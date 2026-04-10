import { Container } from "@/components/ui/container";

const links = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "TikTok", href: "https://tiktok.com" },
  { name: "Facebook", href: "https://facebook.com" }
];

export default function SocialPage() {
  return (
    <Container>
      <h1 className="mb-4 text-2xl font-bold">Redes Sociales</h1>
      <div className="space-y-3">
        {links.map((link) => (
          <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className="neon-card block p-4 hover:border-neonBlue/60">
            {link.name}
          </a>
        ))}
      </div>
    </Container>
  );
}
