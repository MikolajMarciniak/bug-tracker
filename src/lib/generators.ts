import { v4 as uuidv4 } from 'uuid';
import { Project, Board } from './localDatabase';

export const generateId = (): string => {
  return uuidv4();
};

export const generateProject = (title: string, description: string): Project => {
  return {
    id: generateId(),
    title,
    description,
    defaultBoardId: '',
  };
};

export const generateBoard = (projectId: string, name: string): Board => {
  return {
    id: generateId(),
    projectId,
    name,
  };
};