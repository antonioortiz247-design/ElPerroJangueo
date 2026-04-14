import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/store/cart-provider";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import { PwaRegister } from "@/components/pwa-register";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "El Perro Jangueo",
  description: "Mojitos, azulitos y cocteles con pedido directo por WhatsApp",
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <PwaRegister />
          <SiteHeader />
          {children}
          <WhatsAppFloatingButton />
        </CartProvider>
      </body>
    </html>
  );
}
