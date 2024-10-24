import { create } from 'zustand';

interface EditorState {
  currentPage: string | null;
  pages: string[];
  setCurrentPage: (page: string) => void;
  addPage: (page: string) => void;
  removePage: (page: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentPage: null,
  pages: ['Welcome'],
  setCurrentPage: (page) => set({ currentPage: page }),
  addPage: (page) =>
    set((state) => ({ pages: [...state.pages, page], currentPage: page })),
  removePage: (page) =>
    set((state) => ({ pages: state.pages.filter((p) => p !== page) })),
}));