import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  Menu,
  LogOut,
  Plus,
} from 'lucide-react';
import { useEditorStore } from '../store/editor';
import { useAuthStore } from '../store/auth';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pages, currentPage, addPage, setCurrentPage } = useEditorStore();
  const logout = useAuthStore((state) => state.logout);

  const recentPages = pages
    .slice()
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderPageItem = (page: any, depth = 0) => {
    const hasChildren = pages.some((p) => p.parent_id === page.id);
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div key={page.id} style={{ marginLeft: `${depth * 1.5}rem` }}>
        <button
          onClick={() => setCurrentPage(page)}
          className={cn(
            'w-full flex items-center gap-2 px-2 py-1 rounded-sm text-left text-sm group',
            currentPage?.id === page.id
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="opacity-0 group-hover:opacity-100"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          <FileText className="w-4 h-4 shrink-0" />
          <span className="flex-1 truncate">{page.title || 'Untitled'}</span>
          {page.is_favorite && <Star className="w-3 h-3 text-yellow-500 shrink-0" />}
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
      <div className="w-12 h-screen bg-[var(--bg-secondary)] border-r flex flex-col items-center py-4">
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
    <div className="w-64 h-screen bg-[var(--bg-secondary)] border-r flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <span className="font-semibold">Your Notes</span>
        </div>
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
            <span className="text-sm font-medium text-[var(--text-secondary)]">Recent</span>
          </div>
          <div className="space-y-1">
            {recentPages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page)}
                className="w-full flex items-center gap-2 px-2 py-1 rounded-sm text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Clock className="w-4 h-4 shrink-0" />
                <span className="truncate">{page.title || 'Untitled'}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-secondary)]">Pages</span>
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
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;