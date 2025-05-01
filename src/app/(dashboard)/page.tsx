import React from "react";
import ProjectsList from "@/components/ProjectsList";
import { mockProjects } from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ProjectsList projects={mockProjects} />
    </div>
  );
}