"use client";

import { ThemeProvider } from "flowbite-react";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
// 1. Importa únicamente tu objeto de tema personalizado.
import { customTheme } from "../app/theme"; // Asegúrate que la ruta a tu tema sea correcta

/**
 * Este componente es un "Client Component" que envuelve la aplicación
 * con todos los proveedores basados en React Context.
 */
export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      {/* 2. Pasa el objeto customTheme directamente al prop 'theme'. */}
      <ThemeProvider theme={customTheme}>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}