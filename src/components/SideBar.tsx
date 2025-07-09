"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useProjectContext } from "../contexts/ProjectContext";
import "../styles/sidebar.css";

interface SideBarProps {
  isMobile?: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isMobile = false }) => {
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );
  const { projects, boards, refreshData } = useProjectContext();

  useEffect(() => {
    refreshData();
  }, []);

  const toggleProjectsList = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation
    setProjectsExpanded(!projectsExpanded);
  };

  const toggleProject = (projectId: string) => {
    const newSet = new Set(expandedProjects);
    if (newSet.has(projectId)) {
      newSet.delete(projectId);
    } else {
      newSet.add(projectId);
    }
    setExpandedProjects(newSet);
  };

  const getProjectBoards = (projectId: string) => {
    return boards.filter((board) => board.projectId === projectId);
  };

  return (
    <aside
      role="complementary"
      className={`sidebar ${isMobile ? "hidden" : ""}`}
    >
      <nav role="navigation">
        <ul className="sidebar-nav">
          <li className="sidebar-item-with-icon">
            <Link href="/projects" className="sidebar-link">
              Projects
            </Link>
            <button
              className={`chevron-button ${projectsExpanded ? "rotate" : ""}`}
              onClick={toggleProjectsList}
              aria-label="Toggle Projects List"
            >
              <span className="chevron-icon">▸</span>
            </button>
          </li>

          <li>
            <div
              className={`sidebar-projects-wrapper ${
                projectsExpanded ? "expanded" : ""
              }`}
            >
              <ul className="sidebar-projects">
                {projects.map((project) => {
                  const isExpanded = expandedProjects.has(project.id);
                  return (
                    <li key={project.id}>
                      <div className="sidebar-item-with-icon">
                        <button
                          onClick={() => toggleProject(project.id)}
                          className={`chevron-button ${
                            isExpanded ? "rotate" : ""
                          }`}
                          aria-label={`Toggle ${project.title} Boards`}
                        >
                          <span className="chevron-icon">▸</span>
                        </button>
                        <button
                          onClick={() => toggleProject(project.id)}
                          className="sidebar-project-button"
                        >
                          {project.title}
                        </button>
                      </div>

                      <div
                        className={`sidebar-board-wrapper ${
                          isExpanded ? "expanded" : ""
                        }`}
                      >
                        <ul className="sidebar-board-list">
                          <li>
                            <Link
                              href={`/projects/${project.id}`}
                              className="sidebar-board-link"
                            >
                              Overview
                            </Link>
                          </li>
                          {getProjectBoards(project.id)
                            .sort((a, b) =>
                              a.id === project.defaultBoardId
                                ? -1
                                : b.id === project.defaultBoardId
                                ? 1
                                : 0
                            )
                            .map((board) => (
                              <li key={board.id}>
                                <Link
                                  href={`/projects/${project.id}/board/${board.id}`}
                                  className="sidebar-board-link"
                                >
                                  {board.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>

          <li>
            <Link href="/settings" className="sidebar-link">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
