"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/lib/types";
import { bootstrapLocalDb, localDb } from "@/lib/local-storage-db";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);

  const load = () => setOrders(localDb.getOrders());

  useEffect(() => {
    bootstrapLocalDb();
    load();
  }, []);

  const updateStatus = (id: string, status: Order["status"]) => {
    const updated = localDb.getOrders().map((order) => (order.id === id ? { ...order, status } : order));
    localDb.saveOrders(updated);
    load();
  };

  const remove = (id: string) => {
    localDb.saveOrders(localDb.getOrders().filter((order) => order.id !== id));
    load();
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Pedidos (LocalStorage)</h1>
      <div className="space-y-2">
        {orders.map((order) => (
          <div key={order.id} className="neon-card p-3">
            <div className="flex items-center justify-between">
              <button onClick={() => setSelected(order)} className="text-left">
                #{order.id.slice(0, 8)} - ${order.total} - {order.status}
              </button>
              <div className="space-x-2">
                <select value={order.status} className="rounded bg-white/10 p-1" onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}>
                  <option value="new">new</option><option value="processing">processing</option><option value="completed">completed</option>
                </select>
                <button onClick={() => remove(order.id)} className="text-red-400">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70" onClick={() => setSelected(null)}>
          <div className="neon-card max-w-lg p-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-2 font-bold">Detalle pedido</h2>
            <pre className="overflow-auto text-xs">{JSON.stringify(selected, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
