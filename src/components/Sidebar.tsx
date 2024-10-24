import { FileText, Plus, LogOut } from 'lucide-react';
import { useEditorStore } from '../store/editor';
import { useAuthStore } from '../store/auth';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const { pages, currentPage, setCurrentPage, addPage } = useEditorStore();
  const logout = useAuthStore((state) => state.logout);

  const handleAddPage = () => {
    const pageName = `Page ${pages.length + 1}`;
    addPage(pageName);
  };

  return (
    <div className="w-64 h-screen bg-gray-50 border-r flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Notion Clone</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Pages</span>
          <button
            onClick={handleAddPage}
            className="p-1 hover:bg-gray-200 rounded-sm"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                'w-full flex items-center gap-2 px-2 py-1 rounded-sm text-left text-sm',
                currentPage === page
                  ? 'bg-gray-200'
                  : 'hover:bg-gray-100 text-gray-700'
              )}
            >
              <FileText className="w-4 h-4" />
              {page}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-2 py-1 rounded-sm text-left text-sm text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;