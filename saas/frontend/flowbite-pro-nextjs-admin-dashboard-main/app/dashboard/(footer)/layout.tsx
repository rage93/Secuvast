import type { PropsWithChildren } from "react";
import DashboardFooter from "./footer";

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main>{children}</main>
      <DashboardFooter />
    </>
  );
}

export default DashboardLayout;
