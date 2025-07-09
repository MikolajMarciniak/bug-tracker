import React from 'react';
import { Card } from '@/lib/localDatabase';
import AddCardForm from './AddCardForm';

interface ColumnProps {
  title: string;
  cards: Card[];
  onAddCard: (cardTitle: string) => void;
  onDeleteCard: (cardId: string) => void;
  onDeleteColumn: () => void;
}

const Column: React.FC<ColumnProps> = ({ title, cards, onAddCard, onDeleteCard, onDeleteColumn }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button 
          onClick={onDeleteColumn}
          className="text-red-500 hover:text-red-700"
        >
          Delete Column
        </button>
      </div>
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