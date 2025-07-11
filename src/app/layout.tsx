import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "@/components/Providers/SessionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cooking with Class - Discover Amazing Cooking Classes Worldwide",
  description: "Find and book the best cooking classes in cities around the world. From Italian pasta making in Rome to sushi in Tokyo, discover culinary adventures with expert instructors.",
  keywords: "cooking classes, culinary workshops, cooking lessons, food classes, cooking courses, chef classes, cooking workshops, culinary education",
  authors: [{ name: "Cooking with Class Team" }],
  creator: "Cooking with Class",
  publisher: "Cooking with Class",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cooking-with-class.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Cooking with Class - Discover Amazing Cooking Classes Worldwide",
    description: "Find and book the best cooking classes in cities around the world. From Italian pasta making in Rome to sushi in Tokyo, discover culinary adventures with expert instructors.",
    url: 'https://cooking-with-class.com',
    siteName: 'Cooking with Class',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cooking with Class - Discover Amazing Cooking Classes Worldwide',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cooking with Class - Discover Amazing Cooking Classes Worldwide",
    description: "Find and book the best cooking classes in cities around the world. From Italian pasta making in Rome to sushi in Tokyo, discover culinary adventures with expert instructors.",
    images: ['/og-image.jpg'],
    creator: '@cookingwithclass',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
