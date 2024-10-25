import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Page {
  id: string;
  title: string;
  content: string;
  parent_id: string | null;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

interface EditorState {
  pages: Page[];
  currentPage: Page | null;
  setCurrentPage: (page: Page | null) => void;
  addPage: () => void;
  updatePage: (page: Page) => void;
  deletePage: (id: string) => void;
  fetchPages: () => Promise<void>;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      pages: [],
      currentPage: null,
      setCurrentPage: (page) => set({ currentPage: page }),
      addPage: () => {
        const newPage: Page = {
          id: crypto.randomUUID(),
          title: 'Untitled',
          content: '<p>Start writing here...</p>',
          parent_id: null,
          is_favorite: false,
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
      fetchPages: async () => {
        // In a real app, this would fetch pages from the API
        // For now, we'll just use the persisted pages
        return Promise.resolve();
      },
    }),
    {
      name: 'editor-storage',
    }
  )
);