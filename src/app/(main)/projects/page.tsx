"use client";
import React, { useState, useEffect } from "react";
import ProjectsList from "@/components/ProjectsList";
import AddProjectForm from "@/components/AddProjectForm";
import {
  getProjects,
  deleteProject,
  addProject,
  Project,
} from "@/lib/operations";
import { useProjectContext } from "@/contexts/ProjectContext";

export default function ProjectsPage() {
  const { refreshData } = useProjectContext();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleAddProject = (title: string, description: string) => {
    addProject(title, description);
    setProjects(getProjects());
    refreshData();
  };

  const handleDeleteProject = (projectId: string) => {
    deleteProject(projectId);
    setProjects(getProjects());
    refreshData();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <AddProjectForm onAddProject={handleAddProject} />
      <ProjectsList projects={projects} onDeleteProject={handleDeleteProject} />
    </div>
  );
}
