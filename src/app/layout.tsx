import React from "react";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirect to dashboard if we're at the root
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    redirect("/dashboard");
  }

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <SideBar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
