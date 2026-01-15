import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Footer } from "@/components/ui/Footer";

export const metadata = {
  title: "T.O.O.L.S Inc - Empowering Individuals To Step Into Their Purpose",
  description: "Together Overcoming Obstacles and Limitations"
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
