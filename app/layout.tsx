import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Usamos Inter desde Google
import "./globals.css";
import { FinanceProvider } from "@/context/FinanceContext";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Home",
  description: "Gestión familiar inteligente",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} antialiased bg-black text-zinc-100`}>
        <FinanceProvider>
            <MainLayout>
                {children}
            </MainLayout>
        </FinanceProvider>
      </body>
    </html>
  );
}