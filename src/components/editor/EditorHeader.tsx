import { useState } from 'react';
import { useEditorStore } from '../../store/editor';
import { Calendar, Clock } from 'lucide-react';

export const EditorHeader = () => {
  const { currentPage, updatePage } = useEditorStore();
  const [title, setTitle] = useState(currentPage?.title || 'Untitled');

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

  return (
    <div className="mb-8 space-y-4">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder-gray-400"
        placeholder="Untitled"
      />
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{new Date(currentPage?.created_at || Date.now()).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Updated {new Date(currentPage?.updated_at || Date.now()).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};