"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mockProjects } from "@/lib/mockData";

interface SideBarProps {
  isMobile?: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isMobile = false }) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
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
              href="/dashboard"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <div className="py-2 px-4 text-gray-700">Projects</div>
            <ul className="ml-4 space-y-1">
              {mockProjects.map((project) => (
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
                      <li>
                        <Link
                          href={`/projects/${project.id}/board/${project.defaultBoardId}`}
                          className="block py-1 px-4 text-gray-600 hover:bg-gray-200 rounded"
                        >
                          Board
                        </Link>
                      </li>
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
