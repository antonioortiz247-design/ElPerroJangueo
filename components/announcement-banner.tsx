"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Announcement } from "@/lib/types";
import { bootstrapLocalDb, localDb } from "@/lib/local-storage-db";

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    bootstrapLocalDb();
    const active = localDb.getAnnouncements().find((item) => item.active) || null;
    setAnnouncement(active);
  }, []);

  if (!announcement) return null;

  return (
    <div className="mb-5 overflow-hidden rounded-xl border border-neonPink/40 bg-neonPink/10 text-sm text-neonPink">
      {announcement.image_url && (
        <div className="relative h-24 w-full">
          <Image src={announcement.image_url} alt="Anuncio" fill className="object-cover" />
        </div>
      )}
      <p className="p-3">{announcement.text}</p>
    </div>
  );
}
