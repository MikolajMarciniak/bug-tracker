"use client";
import React from "react";
import Link from "next/link";
import "../../../styles/dashboard.css";

export default function DashboardPage() {
  return (
    <div className="page-content h-screen">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">
        Welcome to your bug tracker dashboard.
      </p>
      <div className="dashboard-grid">
        <DashboardCard title="Projects" link="/projects">
          View and manage your projects
        </DashboardCard>
        <DashboardCard title="Recent Activity" link="#">
          Check your recent activities
        </DashboardCard>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  children,
  link,
}: {
  title: string;
  children: React.ReactNode;
  link: string;
}) {
  return (
    <Link href={link} className="dashboard-card">
      <h2 className="dashboard-card-title">{title}</h2>
      <p className="dashboard-card-body">{children}</p>
    </Link>
  );
}
