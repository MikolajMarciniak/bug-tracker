import { generateProject, generateBoard } from './generators';

let nextId = 100;  // Start from 100 to avoid conflicts with existing IDs

export const generateId = () => {
  return (nextId++).toString();
};

export const mockProjects = [
  generateProject("Project Alpha", "A cutting-edge web application"),
  generateProject("Project Beta", "Mobile app for fitness tracking"),
  // Add more projects as needed
];

export const mockBoards = [
  generateBoard(mockProjects[0].id, "Alpha Main Board"),
  generateBoard(mockProjects[1].id, "Beta Main Board"),
  // Add more boards as needed
];

// Ensure the defaultBoardId in projects matches the generated board ids
mockProjects[0].defaultBoardId = mockBoards[0].id;
mockProjects[1].defaultBoardId = mockBoards[1].id;