// app/dashboard/projects/[id]/page.js

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchProjectData(id) {
  // Simulate fetching data from an API
  return { id, name: `Project ${id}` };
}

async function fetchBugsForProject(id) {
  // Simulate fetching bugs data from an API
  return [
    { id: 1, title: "Bug 1", status: "Open", severity: "High" },
    { id: 2, title: "Bug 2", status: "Closed", severity: "Medium" },
    { id: 3, title: "Bug 3", status: "In Progress", severity: "Low" },
  ];
}

export default function ProjectDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const projectData = await fetchProjectData(id);
        setProject(projectData);

        const bugsData = await fetchBugsForProject(id);
        setBugs(bugsData);
      } catch (err) {
        setError("Failed to load data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="p-8">
      <button
        onClick={() => router.back()}
        className="text-blue-500 underline mb-4"
      >
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Bug ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Severity</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{bug.id}</td>
              <td className="py-2 px-4 border-b">{bug.title}</td>
              <td className="py-2 px-4 border-b">{bug.status}</td>
              <td className="py-2 px-4 border-b">{bug.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
