import { routing } from "@/i18n/routing";
import { sanityConfigured } from "@/lib/sanity/config";
import { redirect } from "next/navigation";
import { StudioEmbedded } from "./studio-embedded";

export default function StudioPage() {
  if (!sanityConfigured) {
    redirect(`/${routing.defaultLocale}`);
  }

  return <StudioEmbedded />;
}
