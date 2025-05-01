import React from "react";
import dynamic from "next/dynamic";
import { mockProjects } from "@/lib/mockData";

const DynamicBoardComponent = dynamic(() => import("@/components/Board"), {
  ssr: false,
});

export default function ProjectBoardPage({
  params,
}: {
  params: { id: string };
}) {
  const project = mockProjects.find((p) => p.id === params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{project.title} Board</h1>
      <DynamicBoardComponent projectId={project.id} />
    </div>
  );
}
