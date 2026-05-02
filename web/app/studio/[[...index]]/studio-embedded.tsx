"use client";

import { NextStudio } from "next-sanity/studio/client-component";
import sanityConfig from "@/sanity.config";

export function StudioEmbedded() {
  return <NextStudio config={sanityConfig} />;
}
