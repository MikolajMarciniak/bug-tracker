import React from "react";
import { mockProjects } from "@/lib/mockData";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = mockProjects.find(p => p.id === params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
      <p>{project.description}</p>
      {/* Add more project details here */}
    </div>
  );
}