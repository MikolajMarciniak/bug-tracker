"use client";
import { useEffect, useState } from "react";
import {
  getProjects,
  getBoards,
  addBoard,
  deleteBoard,
  Project,
  Board,
} from "@/lib/operations";
import Link from "next/link";
import { useProjectContext } from "@/contexts/ProjectContext";
export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);

  const { refreshData } = useProjectContext();
  useEffect(() => {
    const fetchProjectAndBoards = () => {
      const projects = getProjects();
      const foundProject = projects.find((p) => p.id === params.id);
      setProject(foundProject || null);

      if (foundProject) {
        const projectBoards = getBoards().filter(
          (b) => b.projectId === foundProject.id
        );
        setBoards(projectBoards);
      }
    };

    fetchProjectAndBoards();
  }, [params.id]);

  const handleCreateBoard = () => {
    if (project) {
      const newBoardName = prompt("Enter the name for the new board:");
      if (newBoardName) {
        const newBoard = addBoard(project.id, newBoardName);
        setBoards([...boards, newBoard]);
      }
    }
    refreshData();
  };

  const handleDeleteBoard = (boardId: string) => {
    if (confirm("Are you sure you want to delete this board?")) {
      deleteBoard(boardId);
      setBoards(boards.filter((b) => b.id !== boardId));
    }
    refreshData();
  };

  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
      <p className="mb-4">{project.description}</p>

      <div className="mb-4">
        <button
          onClick={handleCreateBoard}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Create New Board
        </button>
      </div>

      <h2 className="text-xl font-bold mb-2">Boards:</h2>
      {boards.length > 0 ? (
        <ul>
          {boards.map((board) => (
            <li key={board.id} className="mb-2 flex items-center">
              <Link
                href={`/projects/${project.id}/board/${board.id}`}
                className="text-blue-500 hover:underline mr-2"
              >
                {board.name}{" "}
                {board.id === project.defaultBoardId ? "(Main)" : ""}
              </Link>
              <button
                onClick={() => handleDeleteBoard(board.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No boards found for this project.</p>
      )}
    </div>
  );
}
