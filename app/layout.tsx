import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { Footer } from "@/components/ui/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { SessionTimeoutBanner } from "@/components/ui/SessionTimeoutBanner";
import { VisitTracker } from "@/components/ui/VisitTracker";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

export const metadata: Metadata = {
  title: {
    default: "A MackProjekt — Technology built to move people forward",
    template: "%s — A MackProjekt",
  },
  description: "An independent innovation studio turning human-centered ideas into useful digital products for access, opportunity, and trust.",
  metadataBase: new URL("https://mackprojekt.com"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logos/amp-logo.jpeg", type: "image/jpeg" },
      { url: "/logos/amp-logo.jpeg", sizes: "any" },
    ],
    apple: [
      { url: "/logos/amp-logo.jpeg" },
      { url: "/logos/amp-logo.jpeg", sizes: "180x180", type: "image/jpeg" },
    ],
    other: [
      {
        rel: "icon",
        url: "/logos/amp-logo.jpeg",
        type: "image/jpeg",
      },
    ],
  },
  keywords: ["A MackProjekt", "MackEnterprises", "product strategy", "digital products", "social impact technology", "web development"],
  authors: [{ name: "Donyale Mack" }],
  creator: "MackEnterprises",
  publisher: "MackEnterprises",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "A MackProjekt",
  },
  openGraph: {
    title: "A MackProjekt — Technology built to move people forward",
    description: "An independent innovation studio building useful digital products for access, opportunity, and trust.",
    url: "https://mackprojekt.com",
    siteName: "A MackProjekt",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "A MackProjekt — Technology built to move people forward",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A MackProjekt — Technology built to move people forward",
    description: "An independent innovation studio building useful digital products for access, opportunity, and trust.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line compat/compat */}
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
        <VisitTracker />
        {/* Google Analytics */}
        <GoogleAnalytics measurementId="G-HDG1JR4N7X" />
        
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
            <GoogleTagManagerNoScript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          </>
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Footer />
            <CookieConsent />
            <SessionTimeoutBanner />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
