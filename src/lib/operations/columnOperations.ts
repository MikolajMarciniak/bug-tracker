import { v4 as uuidv4 } from "uuid";
import { getFromStorage, setToStorage } from "./storageUtils";

export interface Column {
  id: string;
  boardId: string;
  name: string;
  order: number;
}

export const getColumns = (): Column[] => getFromStorage<Column>("columns");

export const getColumnsByBoard = (boardId: string): Column[] => {
  const columns = getColumns();
  return columns
    .filter((col) => col.boardId === boardId)
    .sort((a, b) => a.order - b.order);
};

export const addColumn = (boardId: string, name: string): Column => {
  const columns = getColumns();
  const newColumn: Column = {
    id: uuidv4(),
    boardId,
    name,
    order: columns.filter((col) => col.boardId === boardId).length,
  };
  columns.push(newColumn);
  setToStorage("columns", columns);
  return newColumn;
};

export const updateColumn = (updatedColumn: Column): void => {
  let columns = getColumns();
  const index = columns.findIndex((col) => col.id === updatedColumn.id);
  if (index !== -1) {
    columns[index] = updatedColumn;
    setToStorage("columns", columns);
  }
};

export const deleteColumn = (columnId: string): void => {
  let columns = getColumns();
  columns = columns.filter((col) => col.id !== columnId);
  setToStorage("columns", columns);
};
