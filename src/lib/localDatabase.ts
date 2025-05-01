import { generateProject, generateBoard } from "./generators";
import { v4 as uuidv4 } from "uuid";

// Type definitions
export interface Project {
  id: string;
  title: string;
  description: string;
  defaultBoardId: string;
}

export interface Board {
  id: string;
  projectId: string;
  name: string;
}

export interface Card {
  id: string;
  boardId: string;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done";
}

// Helper function to get data from localStorage
const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Helper function to set data in localStorage
const setToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Project operations
export const getProjects = (): Project[] => getFromStorage<Project>("projects");

export const addProject = (title: string, description: string): Project => {
  const projects = getProjects();
  const newProject = generateProject(title, description);

  // Create a default board for the new project
  const defaultBoard = generateBoard(newProject.id, `${title} Main Board`);

  // Set the defaultBoardId for the new project
  newProject.defaultBoardId = defaultBoard.id;

  projects.push(newProject);
  setToStorage("projects", projects);

  // Add the default board to the boards storage
  const boards = getBoards();
  boards.push(defaultBoard);
  setToStorage("boards", boards);

  return newProject;
};

export const deleteProject = (projectId: string): void => {
  let projects = getProjects();
  projects = projects.filter((project) => project.id !== projectId);
  setToStorage("projects", projects);

  // Delete associated boards
  let boards = getBoards();
  const boardsToDelete = boards.filter(
    (board) => board.projectId === projectId
  );
  boards = boards.filter((board) => board.projectId !== projectId);
  setToStorage("boards", boards);

  // Delete cards associated with the deleted boards
  let cards = getCards();
  cards = cards.filter(
    (card) => !boardsToDelete.some((board) => board.id === card.boardId)
  );
  setToStorage("cards", cards);
};

// Board operations
export const getBoards = (): Board[] => getFromStorage<Board>("boards");

export const addBoard = (projectId: string, name: string): Board => {
  const boards = getBoards();
  const newBoard = generateBoard(projectId, name);
  boards.push(newBoard);
  setToStorage("boards", boards);

  // Update the project with the new board ID
  const projects = getProjects();
  const projectIndex = projects.findIndex((p) => p.id === projectId);
  if (projectIndex !== -1) {
    projects[projectIndex].defaultBoardId = newBoard.id;
    setToStorage("projects", projects);
  }

  return newBoard;
};

// Initialize localStorage with some data if it's empty
export const initializeDatabase = (): void => {
  if (getProjects().length === 0) {
    const project1 = addProject(
      "Project Alpha",
      "A cutting-edge web application"
    );
    const project2 = addProject(
      "Project Beta",
      "Mobile app for fitness tracking"
    );

    const board1 = addBoard(project1.id, "Alpha Main Board");
    const board2 = addBoard(project2.id, "Beta Main Board");

    // Initialize cards
    const initialCards: Card[] = [
      {
        id: uuidv4(),
        boardId: board1.id,
        title: "Implement login",
        description: "Create login functionality for users",
        status: "todo",
      },
      {
        id: uuidv4(),
        boardId: board1.id,
        title: "Design homepage",
        description: "Create a responsive design for the homepage",
        status: "inProgress",
      },
      {
        id: uuidv4(),
        boardId: board2.id,
        title: "Set up user profiles",
        description: "Implement user profile creation and editing",
        status: "todo",
      },
    ];

    setToStorage("cards", initialCards);
  }
};

export const migrateProjectsToUUID = () => {
  const projects = getProjects();
  const boards = getBoards();
  const cards = getCards();
  let updated = false;

  const idMap: { [oldId: string]: string } = {};

  projects.forEach((project) => {
    if (!project.id.includes("-")) {
      const newId = uuidv4();
      idMap[project.id] = newId;
      project.id = newId;
      updated = true;
    }
  });

  boards.forEach((board) => {
    if (idMap[board.projectId]) {
      board.projectId = idMap[board.projectId];
      updated = true;
    }
    if (!board.id.includes("-")) {
      const newId = uuidv4();
      idMap[board.id] = newId;
      board.id = newId;
      updated = true;
    }
  });

  cards.forEach((card) => {
    if (idMap[card.boardId]) {
      card.boardId = idMap[card.boardId];
      updated = true;
    }
    if (!card.id.includes("-")) {
      card.id = uuidv4();
      updated = true;
    }
  });

  if (updated) {
    setToStorage("projects", projects);
    setToStorage("boards", boards);
    setToStorage("cards", cards);
  }
};

// Card operations
export const getCards = (): Card[] => getFromStorage<Card>("cards");

export const addCard = (
  boardId: string,
  title: string,
  description: string
): Card => {
  const cards = getCards();
  const newCard: Card = {
    id: uuidv4(),
    boardId,
    title,
    description,
    status: "todo",
  };
  cards.push(newCard);
  setToStorage("cards", cards);
  return newCard;
};

export const updateCard = (updatedCard: Card): void => {
  let cards = getCards();
  const index = cards.findIndex((card) => card.id === updatedCard.id);
  if (index !== -1) {
    cards[index] = updatedCard;
    setToStorage("cards", cards);
  }
};

export const deleteCard = (cardId: string): void => {
  const cards = getCards();
  const updatedCards = cards.filter(card => card.id !== cardId);
  setToStorage("cards", updatedCards);
};

export const getCardsByBoard = (boardId: string): Card[] => {
  const cards = getCards();
  return cards.filter((card) => card.boardId === boardId);
};
