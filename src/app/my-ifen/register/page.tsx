import type { Metadata } from "next";
import { AccountScreen } from "@/components/account/AccountScreen";
import { accountScreens } from "@/data/account";

export const metadata: Metadata = {
  title: accountScreens.register.metaTitle,
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return <AccountScreen action="register" />;
}
