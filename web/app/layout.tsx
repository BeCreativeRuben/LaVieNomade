import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  verification: { google: "aIee_uJW6--6RAWYjXc5HL57McnREfxf0AKqFZe7MZw" },
};

/** Root passes through — `<html lang>` lives in `[locale]/layout`. */
export default function RootLayout({ children }: Props) {
  return children;
}
