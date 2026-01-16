import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "AMP - A MackProjekt | Innovation Lab of MackEnterprises",
  description: "AMP (A MackProjekt) - The innovation lab behind MackEnterprises. Creating cutting-edge digital solutions, platforms, and experiences that harness the power of AI to destroy the digital divide.",
  icons: {
    icon: "/logos/amp-logo.jpeg",
    apple: "/logos/amp-logo.jpeg",
  },
  keywords: ["AMP", "A MackProjekt", "MackEnterprises", "AI", "Digital Solutions", "Web Development", "Innovation", "Technology"],
  authors: [{ name: "Donyale Mack" }],
  creator: "MackEnterprises",
  publisher: "MackEnterprises",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-text antialiased">
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
