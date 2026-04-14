"use client";

import { Container } from "@/components/ui/container";
import { useCartStore } from "@/store/cart-store";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { bootstrapLocalDb, localDb } from "@/lib/local-storage-db";

export default function CartPage() {
  const { items, removeItem, clear } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "18095551234";

  const saveOrder = () => {
    bootstrapLocalDb();
    const orders = localDb.getOrders();
    orders.unshift({
      id: crypto.randomUUID(),
      items,
      total,
      status: "new",
      created_at: new Date().toISOString()
    });
    localDb.saveOrders(orders);
    clear();
  };

  return (
    <Container>
      <h1 className="mb-4 text-2xl font-bold">Carrito</h1>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="neon-card flex items-center justify-between p-3">
            <div>
              <p>{item.name}</p>
              <p className="text-sm text-white/70">{item.qty} x ${item.price}</p>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-neonPink">Quitar</button>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xl font-semibold">Total: ${total.toFixed(2)}</p>
      <div className="mt-4 flex gap-3">
        <a className="rounded-lg bg-green-500 px-4 py-2" href={buildWhatsAppUrl(phone, items)} target="_blank" rel="noreferrer">Enviar por WhatsApp</a>
        <button className="rounded-lg bg-neonPurple px-4 py-2" onClick={saveOrder}>Registrar pedido</button>
      </div>
    </Container>
  );
}
