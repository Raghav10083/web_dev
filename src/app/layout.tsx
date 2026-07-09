import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "White Owls & Black Tigers | Global Multidisciplinary Professional Institution",
  description: "White Owls & Black Tigers (WOBT) is a global multidisciplinary professional ecosystem connecting intellectual capital, governance, and leadership across law, finance, technology, and public policy. Wisdom to Imagine. Courage to Execute. Excellence to Transform.",
  keywords: [
    "WOBT",
    "White Owls & Black Tigers",
    "Global Professional Ecosystem",
    "Litigation Finance",
    "Litigation Funding India",
    "Multidisciplinary Institution",
    "Legal Tech AI",
    "LexManage",
    "LexPartners",
  ],
  authors: [{ name: "WOBT Institution" }],
  openGraph: {
    title: "White Owls & Black Tigers (WOBT)",
    description: "WOBT is a global multidisciplinary professional ecosystem connecting expertise across law, finance, technology, and public policy.",
    url: "https://www.wobtindia.com",
    siteName: "WOBT",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#090909] text-[#EDEDED] font-sans antialiased overflow-x-hidden selection:bg-[#C8A34A] selection:text-[#090909]">
        {children}
      </body>
    </html>
  );
}
