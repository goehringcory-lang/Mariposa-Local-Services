import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/auth/SessionProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mariposa Local Services — Find Trusted Local Workers",
  description:
    "Your local directory for finding trusted property maintenance, land management, cleaning, firewood, pet care, and senior support services in Mariposa, California and surrounding foothill communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P4V7QHH5HH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-P4V7QHH5HH');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased`}>
        <SessionProvider>
          <Header />
          <main className="min-h-[calc(100vh-200px)]">{children}</main>
          <Footer />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
