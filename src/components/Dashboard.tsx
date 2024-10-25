import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Editor from './Editor';
import { CommandMenu } from './CommandMenu';
import { ThemeToggle } from './ThemeToggle';
import { useEditorStore } from '../store/editor';

const Dashboard = () => {
  const { fetchPages } = useEditorStore();

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  return (
    <div className="flex h-screen bg-[var(--bg-primary)]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <Editor />
      </main>
      <CommandMenu />
    </div>
  );
};

export default Dashboard;