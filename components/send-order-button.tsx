"use client";

import { useCartStore } from "@/store/cart-store";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function SendOrderButton() {
  const items = useCartStore((s) => s.items);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "18095551234";

  if (!items.length) return null;

  return (
    <a
      className="fixed bottom-20 right-4 rounded-full bg-neonPurple px-4 py-3 text-sm font-medium shadow-lg"
      href={buildWhatsAppUrl(phone, items)}
      target="_blank"
      rel="noreferrer"
    >
      Enviar pedido
    </a>
  );
}
