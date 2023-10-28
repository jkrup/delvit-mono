import { create } from "zustand";
import { ArticleProps } from "../types/props";

interface appState {
  isSideBarOpen: boolean;
  homeMenu: string;
  articleData: ArticleProps | undefined;
}
interface appAction {
  toggleSideBar: (newState: boolean) => void;
  setHomeMenu: (newState: string) => void;
  setArticleData: (newState: ArticleProps) => void;
}
export const useStore = create<appState & appAction>((set) => ({
  isSideBarOpen: false,
  toggleSideBar: (newState: boolean) =>
    set(() => ({ isSideBarOpen: newState })),
  homeMenu: "question",
  setHomeMenu: (newState: string) => set(() => ({ homeMenu: newState })),
  articleData: undefined,
  setArticleData: (articleData: ArticleProps) => set(() => ({ articleData })),
}));
