import { MainNav } from "./MainNav";
import { UtilityBar } from "./UtilityBar";

// Siblings rather than one <header>, so the main nav can stick to the viewport
// while the utility bar scrolls away.
export function SiteHeader() {
  return (
    <>
      <UtilityBar />
      <MainNav />
    </>
  );
}
