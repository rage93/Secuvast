// app/debug-env/page.tsx
"use client";
import { useEffect } from "react";

export default function DebugEnv() {
  useEffect(() => {
    console.log("API_URL →", process.env.NEXT_PUBLIC_API_URL);
  }, []);
  return <p className="p-6">Mira la consola: variable impresa.</p>;
}
