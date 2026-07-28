import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

const heading = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://venkata-naveen-portfolio.venkatanaveench519.chatgpt.site"),
  title: "Venkata Naveen Chava | Software Engineer",
  description:
    "Portfolio of Venkata Naveen Chava — software engineer building AI-enabled products, backend platforms, and computer-vision systems.",
  openGraph: {
    title: "Venkata Naveen Chava | Software Engineer",
    description: "Building intelligent software beyond the demo.",
    url: "/",
    siteName: "Venkata Naveen Chava",
    images: [{ url: "/og.png", alt: "Venkata Naveen Chava — Software Engineer, AI & Backend" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venkata Naveen Chava | Software Engineer",
    description: "Building intelligent software beyond the demo.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
