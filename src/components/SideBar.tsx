"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProjectContext } from "../contexts/ProjectContext";
import "../styles/sidebar.css";

interface SideBarProps {
  isMobile?: boolean;
  isCollapsed: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isMobile = false, isCollapsed }) => {
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );
  const { projects, boards, refreshData } = useProjectContext();

  useEffect(() => {
    refreshData();
  }, []);

  const toggleProjectsList = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const getProjectBoards = (projectId: string) =>
    boards.filter((board) => board.projectId === projectId);

  return (
    <aside
      role="complementary"
      className={`sidebar ${isCollapsed ? "collapsed" : ""} top-14 fixed`}
    >
      <div className="sidebar-header flex items-center justify-between px-2 py-3">
        {/* HamburgerMenu removed here */}
      </div>

      <nav role="navigation" className="sidebar-content">
        <ul className="sidebar-nav">
          <li className="sidebar-item-with-icon">
            <Link href="/dashboard" className="sidebar-link">
              <img
                src="/icons/house.svg"
                alt="Dashboard Icon"
                className="w-6 sidebar-icon"
              />
              <span className="sidebar-label">Dashboard</span>
            </Link>
          </li>

          <li className="sidebar-item-with-icon">
            <Link href="/projects" className="sidebar-link">
              <img
                src="/icons/folder.svg"
                alt="Projects Icon"
                className="w-6 sidebar-icon"
              />
              <span className="sidebar-label">Projects</span>
            </Link>
            {!isCollapsed && (
              <button
                onClick={toggleProjectsList}
                aria-label="Toggle Projects"
                className="ml-auto"
              >
                {projectsExpanded ? "▼" : "▶"}
              </button>
            )}
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
                        {!isCollapsed && (
                          <button
                            onClick={() => toggleProject(project.id)}
                            aria-label={`Toggle ${project.title}`}
                            className="mr-2"
                          >
                            {isExpanded ? "▼" : "▶"}
                          </button>
                        )}
                        <button
                          onClick={() => toggleProject(project.id)}
                          className="sidebar-project-button"
                        >
                          📌{" "}
                          <span className="sidebar-label">{project.title}</span>
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
                              📄 <span className="sidebar-label">Overview</span>
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
                                  🧩{" "}
                                  <span className="sidebar-label">
                                    {board.name}
                                  </span>
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

          <li className="sidebar-item-with-icon">
            <Link href="/issues" className="sidebar-link">
              <img
                src="/icons/bug.svg"
                alt="Issues Icon"
                className="w-6 sidebar-icon"
              />
              <span className="sidebar-label">Issues</span>
            </Link>
          </li>

          <li className="sidebar-item-with-icon">
            <Link href="/reports" className="sidebar-link">
              <img
                src="/icons/bar-chart-4.svg"
                alt="Reports Icon"
                className="w-6 sidebar-icon"
              />
              <span className="sidebar-label">Reports</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
