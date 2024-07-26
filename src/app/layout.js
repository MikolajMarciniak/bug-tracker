import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/Sidebar"; // Adjust the import path as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bug Tracker",
  description: "This is my bug tracker app, powered by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <Sidebar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
