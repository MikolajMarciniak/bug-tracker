"use client";

import React from "react";
import Table from "../_components/Table";

const bugColumns = ["id", "title", "status", "severity"];

export default function ProjectDetails({ projectDetails }) {
  if (!projectDetails) return <div>Loading...</div>;

  const { project, bugs } = projectDetails;

  const handleRowDoubleClick = (bug) => {
    console.log("Double-clicked bug:", bug);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{project.name} Details</h2>
      <Table
        columns={bugColumns}
        data={bugs}
        onRowDoubleClick={handleRowDoubleClick}
      />
    </div>
  );
}
