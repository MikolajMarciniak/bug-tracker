import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome to your bug tracker dashboard.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardCard title="Projects" link="/projects">
          View and manage your projects
        </DashboardCard>
        <DashboardCard title="Recent Activity" link="#">
          Check your recent activities
        </DashboardCard>
        {/* Add more dashboard cards as needed */}
      </div>
    </div>
  );
}

function DashboardCard({ title, children, link }: { title: string; children: React.ReactNode; link: string }) {
  return (
    <Link href={link} className="block p-6 bg-white rounded-lg shadow-md hover:bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{children}</p>
    </Link>
  );
}