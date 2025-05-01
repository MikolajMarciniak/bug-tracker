"use client";
import { useEffect, useState } from "react";
import { getProjects, getBoards, Project, Board } from "@/lib/localDatabase";
import Link from "next/link";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [defaultBoard, setDefaultBoard] = useState<Board | null>(null);

  useEffect(() => {
    const projects = getProjects();
    const foundProject = projects.find((p) => p.id === params.id);
    setProject(foundProject || null);

    if (foundProject) {
      if (foundProject.defaultBoardId) {
        const boards = getBoards();
        const foundBoard = boards.find(
          (b) => b.id === foundProject.defaultBoardId
        );
        setDefaultBoard(foundBoard || null);
      } else {
        const boards = getBoards();
        const projectBoard = boards.find(
          (b) => b.projectId === foundProject.id
        );
        setDefaultBoard(projectBoard || null);
      }
    }
  }, [params.id]);

  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
      <p className="mb-4">{project.description}</p>
      {defaultBoard ? (
        <Link
          href={`/projects/${project.id}/board/${defaultBoard.id}`}
          className="text-blue-500 hover:underline"
        >
          Go to Main Board
        </Link>
      ) : (
        <p>No board found for this project.</p>
      )}
    </div>
  );
}
