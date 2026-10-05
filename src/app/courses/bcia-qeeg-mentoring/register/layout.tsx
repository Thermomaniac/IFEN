import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RegisterHeader } from "@/components/register/RegisterHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";

export const metadata: Metadata = {
  robots: { index: false },
};

/** Paper: site header, ink title band, the step body, then the homepage CTA and footer. */
export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <RegisterHeader />
        {children}
      </main>
      <CtaFooter />
    </>
  );
}
