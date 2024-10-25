import { useState, useEffect, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { Command, Heading1, Heading2, Heading3, List, ListTodo, Image, Code } from 'lucide-react';
import { getCaretCoordinates } from '../../lib/utils';

interface CommandMenuItem {
  title: string;
  icon: React.ReactNode;
  command: (editor: Editor) => void;
}

const COMMANDS: CommandMenuItem[] = [
  {
    title: 'Heading 1',
    icon: <Heading1 className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    title: 'Heading 2',
    icon: <Heading2 className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    title: 'Heading 3',
    icon: <Heading3 className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    title: 'Bullet List',
    icon: <List className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    title: 'Task List',
    icon: <ListTodo className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleTaskList().run(),
  },
  {
    title: 'Code Block',
    icon: <Code className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    title: 'Image',
    icon: <Image className="w-4 h-4" />,
    command: (editor) => {
      const url = window.prompt('Enter image URL');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    },
  },
];

interface EditorCommandMenuProps {
  editor: Editor;
}

export const EditorCommandMenu = ({ editor }: EditorCommandMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % COMMANDS.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + COMMANDS.length) % COMMANDS.length);
        break;
      case 'Enter':
        e.preventDefault();
        COMMANDS[selectedIndex].command(editor);
        setIsOpen(false);
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  }, [isOpen, selectedIndex, editor]);

  useEffect(() => {
    const handleSlash = () => {
      const coords = getCaretCoordinates();
      if (coords) {
        setPosition(coords);
        setIsOpen(true);
        setSelectedIndex(0);
      }
    };

    editor.on('slash', handleSlash);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      editor.off('slash', handleSlash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 w-72 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
      style={{
        left: position.x,
        top: position.y + 10,
      }}
    >
      <div className="p-2 border-b">
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500">
          <Command className="w-4 h-4" />
          <span>Commands</span>
        </div>
      </div>
      <div className="py-2">
        {COMMANDS.map((item, index) => (
          <button
            key={item.title}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm ${
              index === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
            onClick={() => {
              item.command(editor);
              setIsOpen(false);
            }}
          >
            {item.icon}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};