import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Linguarush - How fast can you identify languages?",
  description: "Test your language recognition skills with Linguarush! Identify languages from text samples across multiple game modes: Sprint, Time Attack, Endless, and Perfect Run. Challenge yourself with 24+ languages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
