"use client";

import Table from "../../../_components/Table";

const bugColumns = ["id", "title", "status", "severity"];
const bugData = [
  { id: 1, title: "Bug 1", status: "Open", severity: "High" },
  { id: 2, title: "Bug 2", status: "Closed", severity: "Medium" },
];

export default function ProjectDetail({ params }) {
  const { id } = params;

  const handleRowDoubleClick = (bug) => {
    console.log("Double-clicked bug:", bug);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Project {id} Details</h1>
      <Table
        columns={bugColumns}
        data={bugData}
        onRowDoubleClick={handleRowDoubleClick}
      />
    </div>
  );
}
