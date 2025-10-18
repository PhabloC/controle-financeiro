import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { FinancialProvider } from "@/contexts/FinancialContext";
import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="theme-dark">
        <AuthProvider>
          <FinancialProvider>
            <ClientLayout>{children}</ClientLayout>
          </FinancialProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
