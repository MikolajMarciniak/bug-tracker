"use client";

import React, { useState, useEffect } from "react";
import ProjectDashboard from "../_components/ProjectDashboard";
import ProjectDetails from "../_components/ProjectDetails";
import { fetchProjects, fetchProjectDetails } from "../_helpers/dataHelpers";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProjectDashboard, setShowProjectDashboard] = useState(true); // New state to manage visibility

  useEffect(() => {
    async function loadProjects() {
      const projectList = await fetchProjects();
      setProjects(projectList);
      setLoading(false);
    }
    loadProjects();
  }, []);

  const handleProjectSelect = async (project) => {
    setLoading(true);
    const details = await fetchProjectDetails(project.id);
    setSelectedProjectDetails(details);
    setLoading(false);
    setShowProjectDashboard(false);
  };

  const handleBackToDashboard = () => {
    setSelectedProjectDetails(null);
    setShowProjectDashboard(true);
  };

  return (
    <div className="p-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {showProjectDashboard && (
            <ProjectDashboard
              projects={projects}
              onProjectSelect={handleProjectSelect}
            />
          )}
          {selectedProjectDetails && (
            <div>
              <button
                onClick={handleBackToDashboard}
                className="mb-4 text-blue-500"
              >
                Back to Projects
              </button>
              <ProjectDetails projectDetails={selectedProjectDetails} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
