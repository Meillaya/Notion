import { BubbleMenu, Editor } from '@tiptap/react';
import { Bold, Italic, Link2, List, ListTodo } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EditorBubbleMenuProps {
  editor: Editor;
}

const MenuButton = ({ onClick, isActive, children }: { onClick: () => void; isActive: boolean; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={cn(
      'p-1 rounded hover:bg-gray-100',
      isActive && 'bg-gray-100'
    )}
  >
    {children}
  </button>
);

export const EditorBubbleMenu = ({ editor }: EditorBubbleMenuProps) => {
  const addLink = () => {
    const url = window.prompt('Enter the URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="flex items-center gap-1 bg-white rounded-lg shadow-lg p-2 border">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
          <Bold className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
          <Italic className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
          <List className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')}>
          <ListTodo className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={addLink} isActive={editor.isActive('link')}>
          <Link2 className="w-4 h-4" />
        </MenuButton>
      </div>
    </BubbleMenu>
  );
};