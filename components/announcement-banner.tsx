import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function AnnouncementBanner() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("announcements")
    .select("text")
    .eq("active", true)
    .limit(1)
    .maybeSingle();

  if (error || !data?.text) return null;

  return (
    <div className="mb-5 rounded-xl border border-neonPink/40 bg-neonPink/10 p-3 text-sm text-neonPink">
      {data.text}
    </div>
  );
}
