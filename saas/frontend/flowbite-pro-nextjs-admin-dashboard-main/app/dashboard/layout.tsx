// app/(dashboard)/layout.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { SidebarProvider } from "@/contexts/sidebar-context";
import { sidebarCookie } from "@/lib/sidebar-cookie";
import { DashboardNavbar } from "./navbar";
import { DashboardSidebar } from "./sidebar";
import { LayoutContent } from "./layout-content";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  /* ① — comprobamos la sesión en el SERVIDOR */
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard");

  /* ② — resto igual */
  const { isCollapsed } = await sidebarCookie.get();
  return (
    <SidebarProvider initialCollapsed={isCollapsed}>
      <DashboardNavbar />
      <div className="mt-16 flex items-start">
        <DashboardSidebar />
        <LayoutContent>{children}</LayoutContent>
      </div>
    </SidebarProvider>
  );
}
