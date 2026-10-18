import type { Metadata } from "next";
import { AccountScreen } from "@/components/account/AccountScreen";
import { accountScreens } from "@/data/account";

export const metadata: Metadata = {
  title: accountScreens.reset.metaTitle,
  robots: { index: false, follow: true },
};

export default function ResetPage() {
  return <AccountScreen action="reset" />;
}
