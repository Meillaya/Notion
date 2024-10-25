import { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  LogOut,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  Menu,
} from 'lucide-react';
import { useEditorStore } from '../store/editor';
import { useAuthStore } from '../store/auth';
import { cn } from '../lib/utils';

interface Page {
  id: string;
  title: string;
  parent_id: string | null;
  is_favorite: boolean;
  updated_at: string;
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [recentPages, setRecentPages] = useState<Page[]>([]);
  const { pages, currentPage, fetchPages, addPage, setCurrentPage } = useEditorStore();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    const recent = pages
      .slice()
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 5);
    setRecentPages(recent);
  }, [pages]);

  const renderPageItem = (page: Page, depth = 0) => {
    const hasChildren = pages.some((p) => p.parent_id === page.id);
    const isExpanded = true; // TODO: Implement expansion state

    return (
      <div key={page.id} style={{ marginLeft: `${depth * 1.5}rem` }}>
        <button
          onClick={() => setCurrentPage({ ...page, content: '' })}
          className={cn(
            'w-full flex items-center gap-2 px-2 py-1 rounded-sm text-left text-sm group',
            currentPage?.id === page.id
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
          )}
        >
          {hasChildren && (
            <button className="opacity-0 group-hover:opacity-100">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          <FileText className="w-4 h-4" />
          <span className="flex-1 truncate">{page.title}</span>
          {page.is_favorite && <Star className="w-3 h-3 text-yellow-500" />}
        </button>
        {hasChildren &&
          isExpanded &&
          pages
            .filter((p) => p.parent_id === page.id)
            .map((child) => renderPageItem(child, depth + 1))}
      </div>
    );
  };

  if (isCollapsed) {
    return (
      <div className="w-12 h-screen bg-gray-50 dark:bg-gray-900 border-r flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-sm"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 h-screen bg-gray-50 dark:bg-gray-900 border-r flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-semibold">Notion Clone</h1>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-sm"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Recent</span>
          </div>
          <div className="space-y-1">
            {recentPages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage({ ...page, content: '' })}
                className="w-full flex items-center gap-2 px-2 py-1 rounded-sm text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Clock className="w-4 h-4" />
                {page.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Pages</span>
            <button
              onClick={() => addPage()}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-sm"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1">
            {pages.filter((p) => !p.parent_id).map((page) => renderPageItem(page))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-2 py-1 rounded-sm text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;