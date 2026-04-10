import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function AnnouncementBanner() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("announcements")
    .select("text")
    .eq("active", true)
    .limit(1)
    .maybeSingle();

  if (!data?.text) return null;
  return (
    <div className="mb-5 rounded-xl border border-neonPink/40 bg-neonPink/10 p-3 text-sm text-neonPink">
      {data.text}
    </div>
  );
}
