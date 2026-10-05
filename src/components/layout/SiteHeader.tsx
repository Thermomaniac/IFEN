import { MainNav } from "./MainNav";
import { UtilityBar } from "./UtilityBar";

// Siblings rather than one <header>, so the main nav can stick to the viewport
// while the utility bar scrolls away. Subpages pass currentHref="" so no top
// link claims aria-current.
export function SiteHeader({ currentHref }: { currentHref?: string }) {
  return (
    <>
      <UtilityBar />
      <MainNav currentHref={currentHref} />
    </>
  );
}
