import { v4 as uuidv4 } from "uuid";
import { getFromStorage, setToStorage } from "./storageUtils";

export interface Board {
  id: string;
  projectId: string;
  name: string;
}

export const getBoards = (): Board[] => getFromStorage<Board>("boards");

export const addBoard = (projectId: string, name: string): Board => {
  const boards = getBoards();
  const newBoard: Board = {
    id: uuidv4(),
    projectId,
    name,
  };
  boards.push(newBoard);
  setToStorage("boards", boards);
  return newBoard;
};

export const deleteBoard = (boardId: string): void => {
  let boards = getBoards();
  boards = boards.filter((board) => board.id !== boardId);
  setToStorage("boards", boards);
};
