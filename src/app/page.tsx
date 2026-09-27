import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About/About";
import { Training } from "@/components/sections/Training/Training";
import { Board } from "@/components/sections/Board/Board";
import { Benefits } from "@/components/sections/Benefits/Benefits";
import { Certification } from "@/components/sections/Certification/Certification";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { Hero } from "@/components/sections/Hero/Hero";
import { Locations } from "@/components/sections/Locations/Locations";
import { Partners } from "@/components/sections/Partners/Partners";
import { Testimonials } from "@/components/sections/Testimonials/Testimonials";
import { Video } from "@/components/sections/Video/Video";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Certification />
        <Training />
        <Board />
        <Benefits />
        <Video />
        <Locations />
        <Partners />
        <Testimonials />
      </main>
      <CtaFooter />
    </>
  );
}
