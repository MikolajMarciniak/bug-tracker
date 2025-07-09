// context/ProjectContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getProjects, getBoards, Project, Board } from "@/lib/operations";

interface ProjectContextType {
  projects: Project[];
  boards: Board[];
  refreshData: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);

  const refreshData = () => {
    setProjects(getProjects());
    setBoards(getBoards());
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, boards, refreshData }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProjectContext must be used within ProjectProvider");
  return context;
};
