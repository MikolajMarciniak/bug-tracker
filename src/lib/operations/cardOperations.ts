import { v4 as uuidv4 } from "uuid";
import { getFromStorage, setToStorage } from "./storageUtils";

export interface Card {
  id: string;
  columnId: string;
  title: string;
  description: string;
}

export const getCards = (): Card[] => getFromStorage<Card>("cards");

export const addCard = (
  columnId: string,
  title: string,
  description: string
): Card => {
  const cards = getCards();
  const newCard: Card = {
    id: uuidv4(),
    columnId,
    title,
    description,
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
  const updatedCards = cards.filter((card) => card.id !== cardId);
  setToStorage("cards", updatedCards);
};

export const getCardsByColumn = (columnId: string): Card[] => {
  const cards = getCards();
  return cards.filter((card) => card.columnId === columnId);
};
