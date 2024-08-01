import { useRouter } from "next/navigation";

const projects = [
  { id: 1, name: "Project Alpha", description: "Alpha description" },
  { id: 2, name: "Project Beta", description: "Beta description" },
  { id: 3, name: "Project Gamma", description: "Gamma description" },
];

export default function Dashboard() {
  const router = useRouter();

  const handleDoubleClick = (id) => {
    router.push(`/dashboard/projects/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              onDoubleClick={() => handleDoubleClick(project.id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="py-2 px-4 border-b">{project.id}</td>
              <td className="py-2 px-4 border-b">{project.name}</td>
              <td className="py-2 px-4 border-b">{project.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
