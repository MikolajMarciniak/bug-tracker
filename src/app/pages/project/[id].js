// pages/project/[id].js
import { useRouter } from "next/router";

export default function ProjectPage({ project }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <h2 className="text-xl mb-2">Collaborators</h2>
      <ul>
        {project.collaborators.map((collaborator) => (
          <li key={collaborator.id}>{collaborator.name}</li>
        ))}
      </ul>
      <h2 className="text-xl mt-4 mb-2">Tickets</h2>
      <ul>
        {project.tickets.map((ticket) => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticPaths() {
  const projects = await fetchProjects();
  const paths = projects.map((project) => ({
    params: { id: project.id.toString() },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const project = await fetchProjectById(params.id);
  return { props: { project } };
}
