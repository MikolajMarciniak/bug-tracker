import React from 'react';
import { Card } from '@/lib/localDatabase';
import AddCardForm from './AddCardForm';

interface ColumnProps {
  id: string;
  title: string;
  cards: Card[];
  onAddCard: (cardTitle: string) => void;
  onDeleteCard: (cardId: string) => void;  // Add this line
}

const Column: React.FC<ColumnProps> = ({ id, title, cards, onAddCard, onDeleteCard }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {cards.map((card) => (
        <div key={card.id} className="bg-white p-2 mb-2 rounded shadow flex justify-between items-center">
          <p>{card.title}</p>
          <button 
            onClick={() => onDeleteCard(card.id)} 
            className="text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      ))}
      <AddCardForm onAddCard={onAddCard} />
    </div>
  );
};

export default Column;