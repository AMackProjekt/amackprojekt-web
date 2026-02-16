import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { Footer } from "@/components/ui/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

export const metadata: Metadata = {
  title: "{{CLIENT_NAME}} | {{COMPANY_DESCRIPTION}}",
  description: "{{COMPANY_DESCRIPTION}}",
  metadataBase: new URL("https://{{CLIENT_DOMAIN}}"),
  manifest: "/manifest.json",
  icons: {
    icon: "/logos/icon.png",
    apple: [
      { url: "/logos/icon.png" },
      { url: "/logos/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: ["{{CLIENT_NAME}}", "business", "services", "professional"],
  authors: [{ name: "{{CLIENT_NAME}}" }],
  creator: "{{CLIENT_NAME}}",
  publisher: "{{CLIENT_NAME}}",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "{{CLIENT_NAME}}",
  },
  openGraph: {
    title: "{{CLIENT_NAME}} | {{COMPANY_DESCRIPTION}}",
    description: "{{COMPANY_DESCRIPTION}}",
    url: "https://{{CLIENT_DOMAIN}}",
    siteName: "{{CLIENT_NAME}}",
    type: "website",
    images: [
      {
        url: "/logos/og-image.png",
        width: 1200,
        height: 630,
        alt: "{{CLIENT_NAME}} Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "{{CLIENT_NAME}} | {{COMPANY_DESCRIPTION}}",
    description: "{{COMPANY_DESCRIPTION}}",
    images: ["/logos/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line compat/compat */}
        <meta name="theme-color" content="{{PRIMARY_COLOR}}" />
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
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
