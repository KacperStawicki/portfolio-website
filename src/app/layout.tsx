import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const IBM = localFont({ src: "../../public/Web437_IBM_BIOS.woff" });
const IBM_PLUS = localFont({ src: "../../public/WebPlus_IBM_BIOS.woff" });

export const metadata: Metadata = {
  title: "Kacper Stawicki",
  description: "Personal portfolio website of Kacper Stawicki.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={IBM_PLUS.className}>{children}</body>
    </html>
  );
}
