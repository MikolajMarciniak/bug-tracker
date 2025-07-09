import React from "react";
import { redirect } from "next/navigation";
import { Providers } from "./providers";
import SideBar from "@/components/SideBar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    redirect("/dashboard");
  }

  return (
    <html lang="en">
      <head>
        <link id="favicon" rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          href="/favicon-light.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/favicon-dark.png"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body data-theme="light">
        <script
          dangerouslySetInnerHTML={{
            __html: `
          function setFavicon() {
            const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const link = document.getElementById('favicon');
            link.href = dark ? '/favicon-dark.png' : '/favicon-light.png';
          }
          setFavicon();
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);
        `,
          }}
        />
        <Providers>
          <div className="flex min-h-screen">
            <SideBar />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
