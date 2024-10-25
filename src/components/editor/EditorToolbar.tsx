import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link2,
  Image,
  Table,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface EditorToolbarProps {
  editor: Editor;
}

const ToolbarButton = ({
  onClick,
  isActive,
  children,
  tooltip,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  tooltip: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 relative group',
      isActive && 'bg-gray-100 dark:bg-gray-800 text-blue-600'
    )}
    title={tooltip}
  >
    {children}
    <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 text-white rounded whitespace-nowrap">
      {tooltip}
    </div>
  </button>
);

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="sticky top-[72px] z-10 bg-[var(--bg-primary)] border-b">
      <div className="flex items-center gap-1 p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          tooltip="Bold (⌘+B)"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          tooltip="Italic (⌘+I)"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          tooltip="Strikethrough (⌘+Shift+S)"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          tooltip="Code (⌘+E)"
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          tooltip="Align left"
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          tooltip="Align center"
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          tooltip="Align right"
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          tooltip="Bullet list"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          tooltip="Numbered list"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <ToolbarButton
          onClick={() => {
            const url = window.prompt('Enter link URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          isActive={editor.isActive('link')}
          tooltip="Add link"
        >
          <Link2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const url = window.prompt('Enter image URL');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          tooltip="Add image"
        >
          <Image className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => 
            editor.chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          tooltip="Insert table"
        >
          <Table className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <ToolbarButton
          onClick={() => {}}
          tooltip="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </ToolbarButton>
      </div>
    </div>
  );
};