import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Page {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface EditorState {
  pages: Page[];
  currentPage: Page | null;
  setCurrentPage: (page: Page) => void;
  addPage: () => void;
  updatePage: (page: Page) => void;
  deletePage: (id: string) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      pages: [],
      currentPage: null,
      setCurrentPage: (page) => set({ currentPage: page }),
      addPage: () => {
        const newPage: Page = {
          id: crypto.randomUUID(),
          title: 'Untitled',
          content: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        set((state) => ({
          pages: [...state.pages, newPage],
          currentPage: newPage,
        }));
      },
      updatePage: (updatedPage) =>
        set((state) => ({
          pages: state.pages.map((p) =>
            p.id === updatedPage.id ? updatedPage : p
          ),
          currentPage: state.currentPage?.id === updatedPage.id ? updatedPage : state.currentPage,
        })),
      deletePage: (id) =>
        set((state) => ({
          pages: state.pages.filter((p) => p.id !== id),
          currentPage: state.currentPage?.id === id ? null : state.currentPage,
        })),
    }),
    {
      name: 'editor-storage',
    }
  )
);