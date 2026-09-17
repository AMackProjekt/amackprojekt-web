import type { Metadata } from "next";
import "./globals.css";
import "./amp.css";
import "./chapters.css";
import "./continuum.css";
import "./gallery.css";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { Footer } from "@/components/ui/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { SessionTimeoutBanner } from "@/components/ui/SessionTimeoutBanner";
import { VisitTracker } from "@/components/ui/VisitTracker";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";
import { InteractionAnalytics } from "@/components/InteractionAnalytics";

export const metadata: Metadata = {
  title: {
    default: "A MackProjekt — Technology built to move people forward",
    template: "%s — A MackProjekt",
  },
  description: "An independent innovation studio turning human-centered ideas into useful digital products for access, opportunity, and trust.",
  alternates: { canonical: "https://mackprojekt.com/" },
  metadataBase: new URL("https://mackprojekt.com"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/brand/amp-logo.jpg", type: "image/jpeg" },
      { url: "/brand/amp-logo.jpg", sizes: "any" },
    ],
    apple: [
      { url: "/brand/amp-logo.jpg" },
      { url: "/brand/amp-logo.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
    other: [
      {
        rel: "icon",
        url: "/brand/amp-logo.jpg",
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "A MackProjekt",
    url: "https://mackprojekt.com",
    logo: "https://mackprojekt.com/brand/amp-logo.jpg",
    description: "An independent innovation studio building human-centered digital products for access, opportunity, and trust.",
    founder: { "@type": "Person", name: "Donyale Mack" },
    knowsAbout: ["Digital product strategy", "Web development", "Artificial intelligence", "Social impact technology", "Healthcare technology", "Nonprofit technology"],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/spacegrotesk.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />

        <meta name="theme-color" content="#24b8c8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker
                    .register('/service-worker.js', { updateViaCache: 'none' })
                    .then(function(registration) {
                      registration.update();
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-sans text-text antialiased">
        <VisitTracker />
        <InteractionAnalytics />
        {/* Google Analytics */}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-HDG1JR4N7X"} />

        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
            <GoogleTagManagerNoScript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          </>
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
