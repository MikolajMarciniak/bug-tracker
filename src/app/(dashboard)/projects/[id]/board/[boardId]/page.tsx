import React from 'react';
import { mockProjects, mockBoards } from "@/lib/mockData";
import BoardComponent from '@/components/Board';

export default function BoardPage({ params }: { params: { id: string, boardId: string } }) {
  const project = mockProjects.find(p => p.id === params.id);
  const board = mockBoards.find(b => b.id === params.boardId);

  if (!project || !board) {
    return <div>Project or Board not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{project.title} - {board.name}</h1>
      <BoardComponent projectId={project.id} boardId={board.id} />
    </div>
  );
}