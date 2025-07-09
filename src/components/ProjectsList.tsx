import React from "react";
import Link from 'next/link';
import { Project } from '@/lib/localDatabase';

interface ProjectListProps {
  projects: Project[];
  onDeleteProject: (projectId: string) => void;
}

const ProjectsList: React.FC<ProjectListProps> = ({ projects, onDeleteProject }) => {
  return (
    <div>
      {projects.map((project) => (
        <div key={project.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p>{project.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <div>
              <Link href={`/projects/${project.id}`} className="text-blue-500 hover:underline mr-4">
                View Project
              </Link>
              <Link href={`/projects/${project.id}/board/${project.defaultBoardId}`} className="text-green-500 hover:underline">
                Go to Board
              </Link>
            </div>
            <button 
              onClick={() => onDeleteProject(project.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;