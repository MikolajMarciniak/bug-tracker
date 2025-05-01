"use client";
import React, { useState, useEffect } from "react";
import ProjectsList from "@/components/ProjectsList";
import AddProjectForm from "@/components/AddProjectForm";
import { getProjects, addProject, addBoard, deleteProject, Project } from "@/lib/localDatabase";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleAddProject = (title: string, description: string) => {
    const newProject = addProject(title, description);
    addBoard(newProject.id, `${title} Main Board`);
    setProjects(getProjects());  // Refresh the projects list
  };

  const handleDeleteProject = (projectId: string) => {
    deleteProject(projectId);
    setProjects(getProjects());  // Refresh the projects list
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <AddProjectForm onAddProject={handleAddProject} />
      <ProjectsList projects={projects} onDeleteProject={handleDeleteProject} />
    </div>
  );
}