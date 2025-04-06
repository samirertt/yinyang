// CharacterContext.tsx
import { createContext, useContext } from "react";

export interface CharacterContextType {
  user: { username: string; userId: number };
  chatList: { name: string; image: string; details: string }[];
  addChat: (
    name: string,
    image: string,
    details: string,
    chatId: number
  ) => void;
}

export const CharacterContext = createContext<CharacterContextType | null>(null);

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) throw new Error("useCharacterContext must be inside provider");
  return context;
};
