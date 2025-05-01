import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";

interface ColumnProps {
  id: string;
  title: string;
}

const Column: React.FC<ColumnProps> = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-100 p-4 rounded-lg w-64"
    >
      <h2 className="font-bold mb-4">{title}</h2>
      <Card id="card1" content="Task 1" />
      <Card id="card2" content="Task 2" />
      {/* Add more cards as needed */}
    </div>
  );
};

export default Column;
