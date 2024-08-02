"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Table from "../../_components/Table";

const bugColumns = ["id", "title", "status", "severity"];

async function fetchProjectData(id) {
  // Replace with your data fetching logic
  const project = { id, name: `Project ${id}` }; // Mock project data
  const bugs = [
    { id: 1, title: "Bug 1", status: "Open", severity: "High" },
    { id: 2, title: "Bug 2", status: "Closed", severity: "Medium" },
  ]; // Mock bug data

  return { project, bugs };
}

export default function ProjectDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get project ID from query parameters

  const [project, setProject] = useState(null);
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (id) {
        const data = await fetchProjectData(id);
        setProject(data.project);
        setBugs(data.bugs);
      }
    }
    loadData();
  }, [id]);

  const handleRowDoubleClick = (bug) => {
    console.log("Double-clicked bug:", bug);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{project.name} Details</h1>
      <Table
        columns={bugColumns}
        data={bugs}
        onRowDoubleClick={handleRowDoubleClick}
      />
    </div>
  );
}
