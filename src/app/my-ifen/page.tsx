import type { Metadata } from "next";
import { AccountScreen } from "@/components/account/AccountScreen";
import { accountScreens } from "@/data/account";

export const metadata: Metadata = {
  title: accountScreens.login.metaTitle,
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <AccountScreen action="login" />;
}
