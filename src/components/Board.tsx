'use client';

import React, { useState, useEffect } from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Column from './Column';
import AddColumnForm from './AddColumnForm';
import { getCardsByBoard, addCard, deleteCard, Card } from '@/lib/localDatabase';

interface BoardProps {
  projectId: string;
  boardId: string;
}

const BoardComponent: React.FC<BoardProps> = ({ projectId, boardId }) => {
  const [columns, setColumns] = useState<{ id: string; title: string; cards: Card[] }[]>([
    { id: 'todo', title: 'To Do', cards: [] },
    { id: 'inProgress', title: 'In Progress', cards: [] },
    { id: 'done', title: 'Done', cards: [] },
  ]);

  useEffect(() => {
    const fetchCards = () => {
      const boardCards = getCardsByBoard(boardId);
      setColumns(columns.map(column => ({
        ...column,
        cards: boardCards.filter(card => card.status === column.id)
      })));
    };

    fetchCards();
  }, [boardId]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddColumn = (title: string) => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title,
      cards: [],
    };
    setColumns([...columns, newColumn]);
  };

  const handleAddCard = (columnId: string, cardTitle: string) => {
    const newCard = addCard(boardId, cardTitle, columnId);  // Pass columnId as status
    setColumns(columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: [...column.cards, newCard],
        };
      }
      return column;
    }));
  };

  const handleDeleteCard = (cardId: string) => {
    deleteCard(cardId);  // Delete card from localStorage
    setColumns(columns.map(column => ({
      ...column,
      cards: column.cards.filter(card => card.id !== cardId),
    })));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={columns.map((col) => col.id)} strategy={verticalListSortingStrategy}>
        <div className="flex space-x-4 overflow-x-auto">
          {columns.map((column) => (
            <Column
              key={column.id} 
              id={column.id} 
              title={column.title} 
              cards={column.cards}
              onAddCard={(cardTitle) => handleAddCard(column.id, cardTitle)}
              onDeleteCard={handleDeleteCard}  // Add this line
            />
          ))}
          <AddColumnForm onAddColumn={handleAddColumn} />
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default BoardComponent;