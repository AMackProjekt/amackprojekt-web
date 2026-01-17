import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Footer } from "@/components/ui/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "AMP - A MackProjekt | Innovation Lab of MackEnterprises",
  description: "AMP (A MackProjekt) - The innovation lab behind MackEnterprises. Creating cutting-edge digital solutions, platforms, and experiences that harness the power of AI to destroy the digital divide.",
  metadataBase: new URL("https://mackprojekt.com"),
  manifest: "/manifest.json",
  icons: {
    icon: "/logos/amp-logo.jpeg",
    apple: "/logos/amp-logo.jpeg",
  },
  keywords: ["AMP", "A MackProjekt", "MackEnterprises", "AI", "Digital Solutions", "Web Development", "Innovation", "Technology"],
  authors: [{ name: "Donyale Mack" }],
  creator: "MackEnterprises",
  publisher: "MackEnterprises",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "A MackProjekt",
  },
  openGraph: {
    title: "AMP - A MackProjekt | Innovation Lab",
    description: "Creating cutting-edge digital solutions that harness AI to destroy the digital divide.",
    url: "https://mackprojekt.com",
    siteName: "A MackProjekt",
    type: "website",
    images: [
      {
        url: "/logos/amp-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "AMP - A MackProjekt Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMP - A MackProjekt | Innovation Lab",
    description: "Creating cutting-edge digital solutions that harness AI to destroy the digital divide.",
    images: ["/logos/amp-logo.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#38bdf8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-sans text-text antialiased">
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
