import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from './Card';
import AddCardForm from './AddCardForm';

interface ColumnProps {
  id: string;
  title: string;
  cards: { id: string; title: string }[];
  onAddCard: (cardTitle: string) => void;
}

const Column: React.FC<ColumnProps> = ({ id, title, cards, onAddCard }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-gray-100 p-4 rounded-lg w-64">
      <h2 className="font-bold mb-4">{title}</h2>
      {cards.map((card) => (
        <Card key={card.id} id={card.id} title={card.title} />
      ))}
      <AddCardForm onAddCard={onAddCard} />
    </div>
  );
};

export default Column;