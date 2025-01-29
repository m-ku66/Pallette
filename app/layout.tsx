import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pallette",
  description: "Help restore color to the world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-white text-neutral-900 overflow-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}
