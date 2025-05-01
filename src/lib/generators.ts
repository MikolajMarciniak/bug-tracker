import { v4 as uuidv4 } from 'uuid';

export const generateId = (): string => {
  return uuidv4();
};

export const generateProject = (title: string, description: string) => {
  return {
    id: generateId(),
    title,
    description,
    defaultBoardId: '',
  };
};

export const generateBoard = (projectId: string, name: string) => {
  return {
    id: generateId(),
    projectId,
    name,
  };
};