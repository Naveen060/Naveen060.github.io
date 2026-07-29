import type { Metadata } from "next";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource-variable/dm-sans/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://naveen060.github.io/venkata-naveen-portfolio/"),
  title: "Venkata Naveen Chava | Software Engineer",
  description:
    "Interactive portfolio of Venkata Naveen Chava - software engineer building AI-enabled products, backend platforms, and computer-vision systems.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: "Venkata Naveen Chava | Software Engineer",
    description: "Building useful systems beyond the demo.",
    url: "https://naveen060.github.io/venkata-naveen-portfolio/",
    siteName: "Venkata Naveen Chava",
    images: [{ url: "/venkata-naveen-portfolio/og.png", alt: "Venkata Naveen Chava - Software Engineer, AI & Backend" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venkata Naveen Chava | Software Engineer",
    description: "Building useful systems beyond the demo.",
    images: ["/venkata-naveen-portfolio/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
