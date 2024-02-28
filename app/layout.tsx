import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const roboto = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
