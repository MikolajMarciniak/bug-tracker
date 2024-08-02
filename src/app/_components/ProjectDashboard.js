"use client";

import React from "react";
import Table from "../_components/Table";

const projectColumns = ["id", "name", "status"];

export default function ProjectDashboard({ projects, onProjectSelect }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <Table
        columns={projectColumns}
        data={projects}
        onRowDoubleClick={onProjectSelect}
      />
    </div>
  );
}
