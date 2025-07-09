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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href={`/projects/${id}/board/${defaultBoardId}`} className="text-blue-500 hover:underline">
        View Board
      </Link>
    </div>
  );
};

export default ProjectCard;