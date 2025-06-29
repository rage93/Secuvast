import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import RequireAuth           from "@/components/RequireAuth"; 
// La ruta correcta es ../ para salir del directorio 'app'
import { Providers } from "../components/providers"; 

import "./globals.css";

export const metadata: Metadata = { title: "SecuVast" };

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeModeScript mode="auto" />
      </head>
      <body className={twMerge("bg-gray-50 dark:bg-gray-900", inter.className)}>
        {/* 2. Usa el componente Providers para envolver a los children */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
