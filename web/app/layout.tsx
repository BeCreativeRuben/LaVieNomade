import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Root passes through — `<html lang>` lives in `[locale]/layout`. */
export default function RootLayout({ children }: Props) {
  return children;
}
