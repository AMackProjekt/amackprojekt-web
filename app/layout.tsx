import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Footer } from "@/components/ui/Footer";

export const metadata = {
  title: "A MackProjekt - Visionary Startup Behind MackEnterprises",
  description: "Building innovative digital solutions that transform businesses and empower communities"
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
