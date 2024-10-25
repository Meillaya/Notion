import { BubbleMenu, Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Quote,
  ListOrdered,
  Link2,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface EditorBubbleMenuProps {
  editor: Editor;
}

const MenuButton = ({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'p-1.5 rounded hover:bg-gray-100 transition-colors',
      isActive && 'bg-gray-100 text-blue-600'
    )}
  >
    {children}
  </button>
);

const MenuDivider = () => <div className="w-px h-6 bg-gray-200 mx-1" />;

export const EditorBubbleMenu = ({ editor }: EditorBubbleMenuProps) => {
  const addLink = () => {
    const url = window.prompt('Enter the URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex items-center gap-1 bg-white rounded-lg shadow-lg p-2 border"
    >
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        <Heading1 className="w-4 h-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <Heading2 className="w-4 h-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
      >
        <Heading3 className="w-4 h-4" />
      </MenuButton>

      <MenuDivider />

      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <Bold className="w-4 h-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <Italic className="w-4 h-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
      >
        <Code className="w-4 h-4" />
      </MenuButton>

      <MenuDivider />

      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <List className="w-4 h-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <ListOrdered className="w-4 h-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
      >
        <Quote className="w-4 h-4" />
      </MenuButton>

      <MenuDivider />

      <MenuButton onClick={addLink} isActive={editor.isActive('link')}>
        <Link2 className="w-4 h-4" />
      </MenuButton>
    </BubbleMenu>
  );
};