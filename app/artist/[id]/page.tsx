"use client";

import { useEffect, useState } from "react";
import { ArtistGallery } from "@/components/artist-gallery";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <ArtistGallery />;
}
