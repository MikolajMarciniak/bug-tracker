"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./Column";
import AddColumnForm from "./AddColumnForm";
import {
  getColumnsByBoard,
  addColumn,
  deleteColumn,
  getCardsByColumn,
  addCard,
  deleteCard,
  updateColumn,
  Column as ColumnType,
} from "@/lib/operations";

interface BoardProps {
  projectId: string;
  boardId: string;
}

const BoardComponent: React.FC<BoardProps> = ({ projectId, boardId }) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    const fetchColumns = () => {
      const boardColumns = getColumnsByBoard(boardId);
      setColumns(boardColumns);
    };

    fetchColumns();
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

        const newColumns = arrayMove(items, oldIndex, newIndex);
        newColumns.forEach((col, index) => {
          updateColumn({ ...col, order: index });
        });

        return newColumns;
      });
    }
  };

  const handleAddColumn = (name: string) => {
    const newColumn = addColumn(boardId, name);
    setColumns([...columns, newColumn]);
  };

  const handleDeleteColumn = (columnId: string) => {
    deleteColumn(columnId);
    setColumns(columns.filter((col) => col.id !== columnId));
  };

  const handleAddCard = (columnId: string, cardTitle: string) => {
    const newCard = addCard(columnId, cardTitle, "");
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, cards: [...getCardsByColumn(col.id), newCard] }
          : col
      )
    );
  };

  const handleDeleteCard = (cardId: string, columnId: string) => {
    deleteCard(cardId);
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: getCardsByColumn(col.id).filter(
                (card) => card.id !== cardId
              ),
            }
          : col
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={columns.map((col) => col.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex space-x-4 overflow-x-auto">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.name}
              cards={getCardsByColumn(column.id)}
              onAddCard={(cardTitle) => handleAddCard(column.id, cardTitle)}
              onDeleteCard={(cardId) => handleDeleteCard(cardId, column.id)}
              onDeleteColumn={() => handleDeleteColumn(column.id)}
            />
          ))}
          <AddColumnForm onAddColumn={handleAddColumn} />
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default BoardComponent;
