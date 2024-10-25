import { useState, useEffect } from 'react';
import { useEditorStore } from '../../store/editor';
import { Calendar, Clock, Star, MoreHorizontal, Share2 } from 'lucide-react';

export const EditorHeader = () => {
  const { currentPage, updatePage } = useEditorStore();
  const [title, setTitle] = useState(currentPage?.title || 'Untitled');
  const [isFavorite, setIsFavorite] = useState(currentPage?.is_favorite || false);

  useEffect(() => {
    setTitle(currentPage?.title || 'Untitled');
    setIsFavorite(currentPage?.is_favorite || false);
  }, [currentPage?.id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (currentPage) {
      updatePage({
        ...currentPage,
        title: newTitle,
        updated_at: new Date().toISOString(),
      });
    }
  };

  const toggleFavorite = () => {
    if (currentPage) {
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);
      updatePage({
        ...currentPage,
        is_favorite: newFavoriteStatus,
        updated_at: new Date().toISOString(),
      });
    }
  };

  if (!currentPage) return null;

  return (
    <div className="sticky top-0 z-10 bg-[var(--bg-primary)] border-b">
      <div className="flex items-center justify-between py-4">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder-gray-400 focus:ring-0"
            placeholder="Untitled"
          />
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(currentPage.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Updated {new Date(currentPage.updated_at).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            <Star className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};