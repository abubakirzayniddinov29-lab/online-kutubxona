import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookVerse - Your Digital Library",
  description: "Discover thousands of books, read online, and build your personal library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
