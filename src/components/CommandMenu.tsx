import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import {
  Search,
  File,
  Settings,
  Moon,
  Sun,
  Share2,
  Clock,
} from 'lucide-react';
import { useEditorStore } from '../store/editor';
import { useThemeStore } from '../store/theme';

export const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pages, setCurrentPage } = useEditorStore();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      className="fixed inset-0 z-50 flex items-start justify-center pt-24"
    >
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl border overflow-hidden">
        <Command.Input
          placeholder="Search pages, commands..."
          className="w-full px-4 py-3 border-b outline-none"
        />
        <Command.List className="max-h-96 overflow-y-auto p-2">
          <Command.Group heading="Pages">
            {pages.map((page) => (
              <Command.Item
                key={page.id}
                onSelect={() => {
                  setCurrentPage(page);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <File className="w-4 h-4" />
                {page.title}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Recent">
            {pages
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.updated_at).getTime() -
                  new Date(a.updated_at).getTime()
              )
              .slice(0, 3)
              .map((page) => (
                <Command.Item
                  key={page.id}
                  onSelect={() => {
                    setCurrentPage(page);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Clock className="w-4 h-4" />
                  {page.title}
                </Command.Item>
              ))}
          </Command.Group>

          <Command.Group heading="Settings">
            <Command.Item
              onSelect={() => {
                toggleTheme();
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              Toggle theme
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};