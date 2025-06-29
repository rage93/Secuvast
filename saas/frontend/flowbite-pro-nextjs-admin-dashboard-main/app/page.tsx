// app/page.tsx  (Server Component)
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");   // envía al dashboard si visitas “/”
}
