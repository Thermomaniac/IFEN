import type { ReactNode } from "react";

/** The account screens are full screen (Figma login and register): no site header or footer. */
export default function AccountLayout({ children }: { children: ReactNode }) {
  return <main id="main">{children}</main>;
}
