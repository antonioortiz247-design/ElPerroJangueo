"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { bootstrapLocalDb, localDb } from "@/lib/local-storage-db";

interface GalleryItem { id: string; image_url: string }

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    bootstrapLocalDb();
    setImages(localDb.getGallery());
  }, []);

  return (
    <Container>
      <h1 className="mb-4 text-2xl font-bold">Galería</h1>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((img) => (
          <button key={img.id} className="relative h-32 overflow-hidden rounded-xl" onClick={() => setSelected(img.image_url)}>
            <Image src={img.image_url} alt="Galería" fill className="object-cover" loading="lazy" />
          </button>
        ))}
      </div>
      {selected && (
        <button className="fixed inset-0 z-50 bg-black/90" onClick={() => setSelected(null)}>
          <div className="relative mx-auto h-[80vh] w-[90vw] max-w-3xl">
            <Image src={selected} alt="Preview" fill className="object-contain" />
          </div>
        </button>
      )}
    </Container>
  );
}
