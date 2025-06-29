"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";

/**  
 * Envuelve cualquier subtree y **sólo** lo muestra si hay sesión válida.  
 * - Redirige a `/login?callbackUrl=…` cuando no hay sesión.  
 * - Muestra un spinner provisional mientras `next-auth` hidrata el estado.
 */
export default function RequireAuth({ children }: PropsWithChildren) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;        // todavía consultando la cookie
    if (!session) {
      const cb = encodeURIComponent(window.location.pathname);
      router.replace(`/login?callbackUrl=${cb}`);
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500 dark:text-gray-300">Cargando…</p>
      </div>
    );
  }

  return <>{children}</>;
}
