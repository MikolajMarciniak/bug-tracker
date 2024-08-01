"use client";

import { useRouter } from "next/navigation";
import Table from "../_components/Table";

const projectColumns = ["id", "name", "status"];
const projectData = [
  { id: 1, name: "Project Alpha", status: "Active" },
  { id: 2, name: "Project Beta", status: "Inactive" },
];

export default function Dashboard() {
  const router = useRouter();

  const handleRowDoubleClick = (project) => {
    router.push(`/dashboard/projects/${project.id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <Table
        columns={projectColumns}
        data={projectData}
        onRowDoubleClick={handleRowDoubleClick}
      />
    </div>
  );
}
