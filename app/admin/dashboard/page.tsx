import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const [{ count: orderCount }, { data: revenueRows }, { count: activeProducts }] = await Promise.all([
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("total"),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("active", true)
  ]);

  const revenue = (revenueRows ?? []).reduce((sum, row) => sum + Number(row.total), 0);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="neon-card p-4"><p className="text-sm">Total orders</p><p className="text-2xl font-bold">{orderCount ?? 0}</p></div>
      <div className="neon-card p-4"><p className="text-sm">Total revenue</p><p className="text-2xl font-bold">${revenue.toFixed(2)}</p></div>
      <div className="neon-card p-4"><p className="text-sm">Active products</p><p className="text-2xl font-bold">{activeProducts ?? 0}</p></div>
    </div>
  );
}
