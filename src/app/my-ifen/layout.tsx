import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">{children}</main>
      <CtaFooter />
    </>
  );
}
