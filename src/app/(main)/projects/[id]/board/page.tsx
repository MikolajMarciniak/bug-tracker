"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import { getProjects, getBoards, Project, Board } from '@/lib/localDatabase';

const DynamicBoardComponent = dynamic(() => import("@/components/Board"), {
  ssr: false,
});

export default function ProjectBoardPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    const projects = getProjects();
    const foundProject = projects.find(p => p.id === params.id);
    setProject(foundProject || null);

    if (foundProject) {
      const boards = getBoards();
      const foundBoard = boards.find(b => b.projectId === foundProject.id);
      setBoard(foundBoard || null);
    }
  }, [params.id]);

  if (!project) return <div>Project not found</div>;
  if (!board) return <div>Board not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{project.title} Board</h1>
      <h2 className="text-xl mb-2">{board.name}</h2>
      <DynamicBoardComponent projectId={project.id} boardId={board.id} />
      {/* Add your board content here */}
    </div>
  );
}