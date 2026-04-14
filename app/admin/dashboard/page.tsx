"use client";

import { useEffect, useMemo, useState } from "react";
import type { Order, Product } from "@/lib/types";
import { bootstrapLocalDb, localDb } from "@/lib/local-storage-db";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    bootstrapLocalDb();
    setOrders(localDb.getOrders());
    setProducts(localDb.getProducts());
  }, []);

  const revenue = useMemo(() => orders.reduce((sum, row) => sum + Number(row.total), 0), [orders]);
  const activeProducts = useMemo(() => products.filter((p) => p.active).length, [products]);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="neon-card p-4"><p className="text-sm">Total orders</p><p className="text-2xl font-bold">{orders.length}</p></div>
      <div className="neon-card p-4"><p className="text-sm">Total revenue</p><p className="text-2xl font-bold">${revenue.toFixed(2)}</p></div>
      <div className="neon-card p-4"><p className="text-sm">Active products</p><p className="text-2xl font-bold">{activeProducts}</p></div>
    </div>
  );
}
