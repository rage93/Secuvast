import { SidebarProvider } from "@/contexts/sidebar-context";
import { sidebarCookie } from "@/lib/sidebar-cookie";
import type { PropsWithChildren } from "react";
import { LayoutContent } from "./layout-content";
import { DashboardNavbar } from "./navbar";
import { DashboardSidebar } from "./sidebar";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const sidebarCookieData = await sidebarCookie.get();

  return (
    <SidebarProvider initialCollapsed={sidebarCookieData.isCollapsed}>
      <DashboardNavbar />
      <div className="mt-16 flex items-start">
        <DashboardSidebar />
        <LayoutContent>{children}</LayoutContent>
      </div>
    </SidebarProvider>
  );
}
