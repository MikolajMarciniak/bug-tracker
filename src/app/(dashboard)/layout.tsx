// app/(dashboard)/layout.tsx
import { ReactNode } from "react";
import SideBar from "@/components/SideBar"; // Import the SideBar component

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen" data-testid="dashboard-layout">
          <SideBar /> {/* Add the SideBar component here */}
          <main className="flex-grow p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
