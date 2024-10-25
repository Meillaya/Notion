import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FileText, Plus, Settings, Search } from 'lucide-react';
import { useEditorStore } from '../store/editor';
import Editor from './Editor';
import Sidebar from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { CommandMenu } from './CommandMenu';

const Dashboard = () => {
  const { pages, addPage, currentPage, fetchPages } = useEditorStore();

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  return (
    <div className="h-screen flex bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b flex items-center justify-between px-4 bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => addPage()}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Plus className="w-4 h-4" />
              New page
            </button>
            
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                currentPage ? (
                  <Editor />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <FileText className="w-16 h-16 text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No page selected</h2>
                    <p className="text-[var(--text-secondary)] mb-4">
                      Select a page from the sidebar or create a new one to get started
                    </p>
                    <button
                      onClick={() => addPage()}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                      Create new page
                    </button>
                  </div>
                )
              }
            />
            <Route path="/:pageId" element={<Editor />} />
          </Routes>
        </main>
      </div>

      <CommandMenu />
    </div>
  );
};

export default Dashboard;