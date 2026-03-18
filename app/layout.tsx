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
  metadataBase: new URL("https://www.dieleconsulting.com"),
  title: {
    default: "Leadership Coaching for Technical Leaders | Diele Consulting",
    template: "%s | Diele Consulting",
  },
  description:
    "Joe Diele helps CTOs, VPs, and engineering leaders close the gap between technical excellence and people leadership. Colorado-based, coaching leaders nationwide.",
  keywords: [
    "leadership coaching for engineers",
    "executive coach for technical leaders",
    "leadership coaching Colorado",
    "coaching for CTOs",
    "technical founder coaching",
    "engineering culture coaching",
    "executive coach Denver Colorado",
    "leadership coaching nationwide",
    "coaching for engineering managers",
    "technical culture change coaching",
    "engineering leadership development",
  ],
  authors: [{ name: "Joe Diele", url: "https://www.dieleconsulting.com/about" }],
  creator: "Joe Diele",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dieleconsulting.com",
    siteName: "Diele Consulting",
    title: "Leadership Coaching for Technical Leaders | Diele Consulting",
    description:
      "The skills that made you the best engineer in the room won't make you the best leader. Joe Diele helps CTOs and engineering leaders close that gap. Colorado-based, coaching leaders nationwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Diele Consulting — Leadership Coaching for Technical Leaders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership Coaching for Technical Leaders | Diele Consulting",
    description:
      "The skills that made you the best engineer won't make you the best leader. Joe Diele helps close that gap. Colorado-based, coaching leaders nationwide.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.dieleconsulting.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.dieleconsulting.com/#joe-diele",
      name: "Joe Diele",
      url: "https://www.dieleconsulting.com",
      sameAs: ["https://www.linkedin.com/in/jdiele/"],
      jobTitle: "Executive Coach & Leadership Consultant",
      description:
        "35 years of experience helping technical founders, CTOs, and engineering leaders transition from technical expert to effective people leader.",
      knowsAbout: [
        "Leadership coaching for engineers",
        "Executive coaching",
        "Engineering culture",
        "Technical leadership development",
        "CTO coaching",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Denver",
        addressRegion: "CO",
        addressCountry: "US",
      },
      worksFor: {
        "@id": "https://www.dieleconsulting.com/#organization",
      },
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.dieleconsulting.com/#organization",
      name: "Diele Consulting",
      url: "https://www.dieleconsulting.com",
      logo: "https://www.dieleconsulting.com/og-image.jpg",
      description:
        "Executive coaching and leadership development for technical leaders. Colorado-based, coaching leaders nationwide.",
      founder: {
        "@id": "https://www.dieleconsulting.com/#joe-diele",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Denver",
        addressRegion: "CO",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "State", name: "Colorado" },
        { "@type": "Country", name: "United States" },
      ],
      serviceType: [
        "Executive Coaching",
        "Leadership Coaching",
        "Engineering Culture Consulting",
        "Technical Leadership Development",
      ],
      priceRange: "$$",
      telephone: "",
      sameAs: ["https://www.linkedin.com/in/jdiele/"],
    },
    {
      "@type": "Service",
      "@id": "https://www.dieleconsulting.com/#coaching-service",
      name: "Leadership Coaching for Technical Leaders",
      provider: {
        "@id": "https://www.dieleconsulting.com/#organization",
      },
      description:
        "One-on-one executive coaching for CTOs, VPs of Engineering, and technical founders navigating the transition from individual contributor to people leader.",
      areaServed: [
        { "@type": "State", name: "Colorado" },
        { "@type": "Country", name: "United States" },
      ],
      audience: {
        "@type": "Audience",
        audienceType: "Technical leaders, CTOs, VPs of Engineering, engineering managers",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${caveat.variable} font-sans antialiased`}>
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XW4WYRT1QH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XW4WYRT1QH');
          `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
