import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Executive Coaching for Technical Leaders | Diele Consulting",
  description:
    "I help technical founders and leaders close the gap between technical excellence and people leadership. 35 years of experience. Colorado-based.",
  openGraph: {
    title: "Diele Consulting | Executive Coaching & Leadership Development",
    description:
      "The best technical experts don't always make the best leaders. Until someone shows them how.",
    url: "https://dieleconsulting.com",
    siteName: "Diele Consulting",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${caveat.variable} font-sans antialiased`}>
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H1N1JWETGK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H1N1JWETGK');
          `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
