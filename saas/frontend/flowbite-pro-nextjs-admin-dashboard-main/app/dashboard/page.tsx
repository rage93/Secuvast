"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Importa desde 'next/navigation' en App Router
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Si la sesión no está cargando y no hay usuario, redirigir a login
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);

  // Muestra un estado de carga mientras se verifica la sesión
  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  // Si la sesión existe, muestra el contenido del dashboard
  if (session) {
    return (
      <div className="p-4 sm:p-6 xl:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bienvenido al Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Tu sesión está activa. Email: {session.user?.email}
        </p>
      </div>
    );
  }

  // Si no hay sesión y no está cargando, no renderiza nada (ya que el useEffect redirigirá)
  return null;
}
