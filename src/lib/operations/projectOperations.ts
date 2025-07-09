import { v4 as uuidv4 } from "uuid";
import { getFromStorage, setToStorage } from "./storageUtils";
import { addBoard, Board } from "./boardOperations";

export interface Project {
  id: string;
  title: string;
  description: string;
  defaultBoardId: string;
  boards: string[]; // Array of board IDs
}

export const getProjects = (): Project[] => getFromStorage<Project>("projects");

export const addProject = (title: string, description: string): Project => {
  const projects = getProjects();
  const newProject: Project = {
    id: uuidv4(),
    title,
    description,
    defaultBoardId: "",
    boards: [],
  };

  const newBoard = addBoard(newProject.id, `${title}`);
  newProject.defaultBoardId = newBoard.id;
  newProject.boards.push(newBoard.id);

  projects.push(newProject);
  setToStorage("projects", projects);

  return newProject;
};

export const deleteProject = (projectId: string): void => {
  let projects = getProjects();
  projects = projects.filter((project) => project.id !== projectId);
  setToStorage("projects", projects);
};

export const updateProject = (updatedProject: Project): void => {
  let projects = getProjects();
  const index = projects.findIndex(p => p.id === updatedProject.id);
  if (index !== -1) {
    projects[index] = updatedProject;
    setToStorage("projects", projects);
  }
};
