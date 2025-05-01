import React from 'react';
import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  defaultBoardId: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, description, defaultBoardId }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <Link href={`/projects/${id}`} className="text-blue-500 hover:underline">
          View Project
        </Link>
        <Link href={`/projects/${id}/board/${defaultBoardId}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Go to Board
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;