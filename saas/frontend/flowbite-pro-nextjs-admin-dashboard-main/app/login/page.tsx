"use client";
import { useSearchParams } from "next/navigation";
import { signIn }          from "next-auth/react";
import { useState }        from "react";

export default function LoginPage() {
  const search = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const callbackUrl = search.get("callbackUrl") ?? "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const uname = (e.currentTarget as any).username.value;
    const pwd   = (e.currentTarget as any).password.value;

    setLoading(true);
    const res = await signIn("credentials", {
      username: uname,
      password: pwd,
      callbackUrl,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) setError("Credenciales inválidas");
    else if (res?.url) window.location.href = res.url;
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl border p-6 shadow"
      >
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>

        {error && <p className="rounded bg-red-100 p-2 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium">E-mail / Usuario</label>
          <input
            name="username"
            type="text"
            required
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
