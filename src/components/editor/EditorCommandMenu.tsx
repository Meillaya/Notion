import { useState, useEffect, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { 
  Command, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListTodo, 
  Image, 
  Code,
  Quote,
  Table,
  Divide,
  FileText,
  CheckSquare,
  Calendar,
  Clock,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Type,
  Hash,
  ListOrdered,
  Minus
} from 'lucide-react';
import { getCaretCoordinates } from '../../lib/utils';

interface CommandMenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  command: (editor: Editor) => void;
  keywords?: string[];
  category: 'basic' | 'formatting' | 'media' | 'advanced';
}

const COMMANDS: CommandMenuItem[] = [
  {
    title: 'Text',
    description: 'Just start writing with plain text',
    icon: <FileText className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().setParagraph().run(),
    keywords: ['text', 'plain', 'paragraph', 'normal'],
    category: 'basic'
  },
  {
    title: 'Heading 1',
    description: 'Large section heading',
    icon: <Heading1 className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ['h1', 'header', 'large', 'title'],
    category: 'basic'
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading',
    icon: <Heading2 className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ['h2', 'header', 'medium', 'subtitle'],
    category: 'basic'
  },
  {
    title: 'Heading 3',
    description: 'Small section heading',
    icon: <Heading3 className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ['h3', 'header', 'small'],
    category: 'basic'
  },
  {
    title: 'Bullet List',
    description: 'Create a simple bullet list',
    icon: <List className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
    keywords: ['bullet', 'list', 'unordered', 'points'],
    category: 'basic'
  },
  {
    title: 'Numbered List',
    description: 'Create a numbered list',
    icon: <ListOrdered className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleOrderedList().run(),
    keywords: ['numbered', 'ordered', 'list', '123'],
    category: 'basic'
  },
  {
    title: 'To-do List',
    description: 'Track tasks with a to-do list',
    icon: <ListTodo className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleTaskList().run(),
    keywords: ['todo', 'task', 'checkbox', 'check'],
    category: 'basic'
  },
  {
    title: 'Quote',
    description: 'Add a quote or citation',
    icon: <Quote className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleBlockquote().run(),
    keywords: ['quote', 'blockquote', 'citation'],
    category: 'basic'
  },
  {
    title: 'Code Block',
    description: 'Add a code snippet',
    icon: <Code className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    keywords: ['code', 'snippet', 'pre', 'coding'],
    category: 'advanced'
  },
  {
    title: 'Divider',
    description: 'Add a horizontal divider',
    icon: <Divide className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().setHorizontalRule().run(),
    keywords: ['divide', 'hr', 'line', 'separator'],
    category: 'basic'
  },
  {
    title: 'Table',
    description: 'Add a table',
    icon: <Table className="w-4 h-4" />,
    command: (editor) => 
      editor.chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
    keywords: ['table', 'grid', 'spreadsheet', 'cells'],
    category: 'advanced'
  },
  {
    title: 'Image',
    description: 'Upload or embed an image',
    icon: <Image className="w-4 h-4" />,
    command: (editor) => {
      const url = window.prompt('Enter image URL');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    },
    keywords: ['image', 'photo', 'picture', 'upload'],
    category: 'media'
  },
  {
    title: 'Link',
    description: 'Add a link to text',
    icon: <Link2 className="w-4 h-4" />,
    command: (editor) => {
      const url = window.prompt('Enter URL');
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      }
    },
    keywords: ['link', 'url', 'href', 'website'],
    category: 'basic'
  },
  {
    title: 'Align Left',
    description: 'Align text to the left',
    icon: <AlignLeft className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().setTextAlign('left').run(),
    keywords: ['align', 'left', 'text'],
    category: 'formatting'
  },
  {
    title: 'Center',
    description: 'Center align text',
    icon: <AlignCenter className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().setTextAlign('center').run(),
    keywords: ['align', 'center', 'middle'],
    category: 'formatting'
  },
  {
    title: 'Align Right',
    description: 'Align text to the right',
    icon: <AlignRight className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().setTextAlign('right').run(),
    keywords: ['align', 'right', 'text'],
    category: 'formatting'
  },
  {
    title: 'Highlight',
    description: 'Highlight text with color',
    icon: <Highlighter className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleHighlight().run(),
    keywords: ['highlight', 'mark', 'color'],
    category: 'formatting'
  },
  {
    title: 'Current Time',
    description: 'Insert current time',
    icon: <Clock className="w-4 h-4" />,
    command: (editor) => {
      const time = new Date().toLocaleTimeString();
      editor.chain().focus().insertContent(time).run();
    },
    keywords: ['time', 'clock', 'now'],
    category: 'basic'
  },
  {
    title: 'Current Date',
    description: 'Insert current date',
    icon: <Calendar className="w-4 h-4" />,
    command: (editor) => {
      const date = new Date().toLocaleDateString();
      editor.chain().focus().insertContent(date).run();
    },
    keywords: ['date', 'calendar', 'today'],
    category: 'basic'
  }
];

interface EditorCommandMenuProps {
  editor: Editor;
}

export const EditorCommandMenu = ({ editor }: EditorCommandMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [search, setSearch] = useState('');

  const filteredCommands = COMMANDS.filter((command) => {
    const searchLower = search.toLowerCase();
    return (
      command.title.toLowerCase().includes(searchLower) ||
      command.description.toLowerCase().includes(searchLower) ||
      command.keywords?.some((keyword) => keyword.includes(searchLower))
    );
  });

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, typeof COMMANDS>);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filteredCommands.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filteredCommands.length) % filteredCommands.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].command(editor);
          setIsOpen(false);
          setSearch('');
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearch('');
        break;
      case 'Backspace':
        if (search === '') {
          setIsOpen(false);
        }
        break;
      default:
        if (e.key.length === 1) {
          setSearch((s) => s + e.key);
        }
    }
  }, [isOpen, selectedIndex, filteredCommands, editor, search]);

  useEffect(() => {
    const handleSlash = () => {
      const coords = getCaretCoordinates();
      if (coords) {
        setPosition(coords);
        setIsOpen(true);
        setSelectedIndex(0);
        setSearch('');
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

  const categoryTitles = {
    basic: 'Basic blocks',
    formatting: 'Formatting',
    media: 'Media',
    advanced: 'Advanced blocks'
  };

  return (
    <div
      className="fixed z-50 w-96 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
      style={{
        left: position.x,
        top: position.y + 20,
      }}
    >
      <div className="p-2 border-b">
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500">
          <Command className="w-4 h-4" />
          <span>Type to filter commands...</span>
        </div>
      </div>
      <div className="max-h-[60vh] overflow-y-auto py-2">
        {Object.entries(groupedCommands).map(([category, commands]) => (
          <div key={category}>
            <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {categoryTitles[category as keyof typeof categoryTitles]}
            </div>
            {commands.map((item, index) => {
              const commandIndex = filteredCommands.indexOf(item);
              return (
                <button
                  key={item.title}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm ${
                    commandIndex === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    item.command(editor);
                    setIsOpen(false);
                    setSearch('');
                  }}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded bg-gray-100">
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
        {filteredCommands.length === 0 && (
          <div className="px-3 py-2 text-sm text-gray-500">
            No commands found
          </div>
        )}
      </div>
    </div>
  );
};