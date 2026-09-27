import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

// One variable file covers both Inter (opsz 14) and Inter Display (opsz 32).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "greek"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IFEN | The Institute For EEG-Neurofeedback",
  description:
    "Over 20 years of experience in clinical neurofeedback training & bio-regulatory science. Accredited courses for physicians, therapists and researchers.",
};

export const viewport: Viewport = {
  themeColor: "#072a30",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
