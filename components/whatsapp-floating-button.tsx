"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloatingButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "18095551234";
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-green-500 p-4 text-white shadow-2xl"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
