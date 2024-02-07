import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Portfolio - Kacper Stawicki",
  description: "Personal portfolio website of Kacper Stawicki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-neutral-200 text-neutral-900 ${roboto.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
