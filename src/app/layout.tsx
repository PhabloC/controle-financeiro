import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/hooks/useAuth";
import { FinancialProvider } from "@/contexts/FinancialContext";
import ClientLayout from "@/components/ClientLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={poppins.variable}>
      <body className={`theme-dark ${poppins.className}`}>
        <AuthProvider>
          <FinancialProvider>
            <ClientLayout>{children}</ClientLayout>
          </FinancialProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
