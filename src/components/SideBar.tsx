"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getProjects, getBoards, Project, Board } from "@/lib/localDatabase";

interface SideBarProps {
  isMobile?: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isMobile = false }) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    setProjects(getProjects());
    setBoards(getBoards());
  }, []);

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const getProjectBoards = (projectId: string) => {
    return boards.filter(board => board.projectId === projectId);
  };

  return (
    <aside
      role="complementary"
      className={`w-64 bg-gray-100 p-4 ${isMobile ? "hidden" : ""}`}
    >
      <nav role="navigation">
        <ul className="space-y-2">
          <li>
            <Link
              href="/projects"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              Projects
            </Link>
          </li>
          <li>
            <ul className="ml-4 space-y-1">
              {projects.map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="w-full text-left py-1 px-4 text-gray-700 hover:bg-gray-200 rounded"
                  >
                    {project.title}
                  </button>
                  {expandedProject === project.id && (
                    <ul className="ml-4 space-y-1">
                      <li>
                        <Link
                          href={`/projects/${project.id}`}
                          className="block py-1 px-4 text-gray-600 hover:bg-gray-200 rounded"
                        >
                          Overview
                        </Link>
                      </li>
                      {getProjectBoards(project.id)
                        .sort((a, b) => a.id === project.defaultBoardId ? -1 : b.id === project.defaultBoardId ? 1 : 0)
                        .map((board) => (
                          <li key={board.id}>
                            <Link
                              href={`/projects/${project.id}/board/${board.id}`}
                              className="block py-1 px-4 text-gray-600 hover:bg-gray-200 rounded"
                            >
                              {board.name} {board.id === project.defaultBoardId ? "(Main)" : ""}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link
              href="/settings"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;