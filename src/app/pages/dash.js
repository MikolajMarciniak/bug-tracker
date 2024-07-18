// pages/index.js
import Link from "next/link";

export default function Dashboard({ projects }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link key={project.id} href={`/project/${project.id}`}>
            <a className="block p-4 border rounded hover:bg-gray-100">
              <h2 className="text-xl font-semibold">{project.name}</h2>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch projects from your API or database
  const projects = await fetchProjects();
  return {
    props: {
      projects,
    },
  };
}
