import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eris Note",
  description: "Manager your notes online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background">{children}</body>
    </html>
  );
}
