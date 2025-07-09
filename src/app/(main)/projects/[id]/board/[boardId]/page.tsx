"use client";
import React, { useEffect, useState } from "react";
import { getProjects, getBoards, Project, Board } from "@/lib/operations";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicBoardComponent = dynamic(() => import("@/components/Board"), {
  ssr: false,
});

export default function BoardPage({
  params,
}: {
  params: { id: string; boardId: string };
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const projects = getProjects();
      const foundProject = projects.find((p) => p.id === params.id);
      setProject(foundProject || null);

      const boards = getBoards();
      const foundBoard = boards.find((b) => b.id === params.boardId);
      setBoard(foundBoard || null);

      setLoading(false);
    };

    fetchData();
  }, [params.id, params.boardId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project || !board) {
    return (
      <div>
        <p>Project or Board not found</p>
        <Link href="/projects" className="text-blue-500 hover:underline">
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav className="mb-4">
        <Link
          href="/projects"
          className="text-blue-500 hover:underline"
        >
          Back to Projects
        </Link>
      </nav>
      <h1 className="text-2xl font-bold mb-4">
        {project.title} Board
      </h1>
      <DynamicBoardComponent projectId={project.id} boardId={board.id} />
    </div>
  );
}